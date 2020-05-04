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
import requests
import operator
import json


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


def get_key_phrases(document, stop_list):
    r = Rake(stop_list)
    keywords = r.run(document.lower())

    phrase_list = [word[0] for word in keywords if len(word[0].split(" ")) < 4]
    return phrase_list


# def get_description_keywords():
#     with open('./data/products.json') as products:
#         data = json.load(products)


def similarity_score(s1, s2, match_method):
    if match_method == "Hamming":
        return hamming(s1, s2)
    elif match_method == "Levenshtein":
        return levenshtein(s1, s2)
    elif match_method == "Jaro-Winkler":
        return jaro_winkler(s1, s2)
    elif match_method == "Jaccard":
        return jaccard(s1, s2)
    elif match_method == "Sorensen Dice":
        return sorensen_dice(s1, s2)
    elif match_method == "Ratcliff-Obershelp":
        return ratcliff_obershelp(s1, s2)
    else:
        raise Exception("Could not find similarity score")


def get_product_keywords(product_location, stopwords):
    stored_products = []
    name_keywords = []
    desc_keywords = []
    with open(product_location, "r") as products:
        data = json.load(products)
        for product in data:
            name_keywords.append(get_key_phrases(product["product_name"], stopwords))
            desc_keywords.append(
                get_key_phrases(product["product_description"], stopwords)
            )
            product.pop("product_description", None)
            stored_products.append(product)
    return zip(stored_products, name_keywords, desc_keywords)


def filter_product(
    caption_keyprase, product_with_keywords, match_method, alpha=1, beta=0.4
):
    found_products = []
    scores = []
    caption_string = " ".join(caption_keyprase)

    for (product, name_keywords, desc_keywords) in product_with_keywords:
        name = " ".join(name_keywords).lower()
        desc = " ".join(desc_keywords).lower()
        name_score = alpha * similarity_score(caption_string, name, match_method)
        desc_score = beta * similarity_score(caption_string, desc, match_method)
        product["score"] = name_score + desc_score
        found_products.append(product)
    return sorted(found_products, key=operator.itemgetter("score"), reverse=True)[:5]


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


class ProductSearch:
    def __init__(self, URL, match_method):
        self.URL = URL
        self.match_method = match_method

    def get_products(self):
        API_KEY = "AIzaSyAPUIRfD1l2VF-NpGndoVp7sH85I5PaoR4"
        video_id = get_video_id(self.URL)
        api_url = f"https://www.googleapis.com/youtube/v3/videos?id={video_id}&key={API_KEY}&part=snippet"
        try:
            captions = get_captions(video_id)
            phrase_list = get_key_phrases(captions, "./data/StopList.txt")
            product_with_keywords = get_product_keywords(
                "./data/products.json", "./data/StopList.txt"
            )

            return filter_product(phrase_list, product_with_keywords, self.match_method)
        except:
            raise Exception("Could not find captions.")



if __name__ == "__main__":
    captions = ProductSearch(
        "https://www.youtube.com/watch?v=2xiCVNwhrDU", "Jaccard"
    )
    print(captions.get_products())