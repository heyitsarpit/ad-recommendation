from urllib.parse import urlparse

from rake import Rake
from string_match import (
    hamming,
    levenshtein,
    jaro_winkler,
    jaccard,
    sorensen_dice,
    ratcliff_obershelp,
)
from youtube_transcript_api import YouTubeTranscriptApi
import pandas as pd
from textblob import TextBlob
import requests
import collections
import operator


def get_video_id(url):
    """
    Examples:
    - http://youtu.be/SA2iWivDJiE
    - http://www.youtube.com/watch?v=_oPAwA_Udwc&feature=feedu
    - http://www.youtube.com/embed/SA2iWivDJiE
    - http://www.youtube.com/v/SA2iWivDJiE?version=3&amp;hl=en_US
    """
    o = urlparse(url)
    if o.netloc == "youtu.be":
        return o.path[1:]
    elif o.netloc in ("www.youtube.com", "youtube.com"):
        if o.path == "/watch":
            id_index = o.query.index("v=")
            return o.query[id_index + 2 : id_index + 13]
        elif o.path[:7] == "/embed/":
            return o.path.split("/")[2]
        elif o.path[:3] == "/v/":
            return o.path.split("/")[2]
    return None


def get_captions(video_id):
    res = YouTubeTranscriptApi.get_transcript(video_id)
    captions = ""
    for r in res:
        captions = captions + " " + r.get("text")
    return captions


def get_key_phrases(captions, stop_list):
    r = Rake(stop_list)
    keywords = r.run(captions)

    phrase_list = [word[0] for word in keywords if len(word[0].split(" ")) < 4]
    return phrase_list


def max_similarity_score(phrase, data):
    pass


def filter_product(caption_keyprase_list, description_keyprase_list, match_method):
    found_products = []
    data = pd.read_csv("./data/flipkart_processed.csv", usecols=["product_name"])
    for phrase in caption_keyprase_list:
        if match_method == "Hamming":
            scores = [
                hamming(phrase, name)
                for name in data["product_name"].astype(str).values
            ]
            max_score = max(scores)
            found_products.append({"Key Phrase": phrase, "Score": max_score})

    return sorted(found_products, key=operator.itemgetter("Score"), reverse=True)[:50]


def get_video_meta(URL):
    res = requests.get(URL).json()
    snippets = res["items"][0]["snippet"]

    description = snippets["description"].lower()
    title = snippets["title"].lower()
    tags = snippets["tags"]
    return (description, title, tags)


def match_meta(phrase_list, meta):
    (description, title, tags) = meta

    high_priority = []
    low_priority = []
    for phrase in phrase_list:
        for tag in tags:
            if tag.lower() in phrase:
                high_priority.append(phrase)
            else:
                low_priority.append(phrase)
    return list(set([*high_priority, *low_priority]))


# class captions():
class Captions:
    def __init__(self, URL):
        self.URL = URL

    def get_keywords(self):
        API_KEY = "AIzaSyAPUIRfD1l2VF-NpGndoVp7sH85I5PaoR4"
        video_id = get_video_id(self.URL)
        api_url = f"https://www.googleapis.com/youtube/v3/videos?id={video_id}&key={API_KEY}&part=snippet"
        try:
            captions = get_captions(video_id)
            phrase_list = get_key_phrases(captions, "./data/StopList.txt")
            # brands_products = check_brand_or_product(word_list)
            # meta = get_video_meta(api_url)
            # match_meta(phrase_list, meta)

            return {
                "Hamming": filter_product(phrase_list, match_method="Hamming"),
                "Levenshtein": filter_product(phrase_list, match_method="Levenshtein"),
                "Jaro-Winkler": filter_product(
                    phrase_list, match_method="Jaro-Winkler"
                ),
                "Jaccard": filter_product(phrase_list, match_method="Jaccard"),
                "Sorensen Dice": filter_product(
                    phrase_list, match_method="Sorensen Dice"
                ),
                "Ratcliff-Obershelp": filter_product(
                    phrase_list, match_method="Ratcliff-Obershelp"
                ),
            }
        except:
            raise Exception("Could not find captions.")


if __name__ == "__main__":
    captions = Captions("https://www.youtube.com/watch?v=qyuyKwMujCY")
    print(captions.get_keywords())
