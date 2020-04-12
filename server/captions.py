from urllib.parse import urlparse

import RAKE
from youtube_transcript_api import YouTubeTranscriptApi
import pandas as pd
from textblob import TextBlob


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
    return None  # fail?


def getCaptions(video_id):
    res = YouTubeTranscriptApi.get_transcript(video_id)
    captions = ""
    for r in res:
        captions = captions + " " + r.get("text")
    return captions


def getKeywordList(video_id, stop_list):
    Rake = RAKE.Rake(stop_list)
    captions = getCaptions(video_id)
    keywords = Rake.run(captions)
    return keywords


def getFinalKeys(video_id):
    word_list = []
    string = ""
    keywords = getKeywordList(video_id, "./data/SmartStoplist.txt")
    for word in keywords:
        string = word[0]
        w_list = string.split(" ")
        w_list = [w for w in w_list if len(w) >= 5]
        word_list.extend(w_list)
    return word_list


def check_brand_or_product(video_id):
    found_brands = []
    data = pd.read_csv("./data/flipkart.csv", usecols=["product_name"])
    keywords = getFinalKeys(video_id)
    for word in keywords:
        nums = [
            num
            for num in (data["product_name"].str.find(word.capitalize()))
            if num > -1
        ]
        if len(nums) > 0:
            found_brands.append(word)
    return found_brands


def caption_keywords(URL):
    video_id = get_video_id(URL)
    return list(set(check_brand_or_product(video_id)))
