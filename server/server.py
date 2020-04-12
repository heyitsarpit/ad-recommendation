import json
from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin

from captions import caption_keywords

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


URL = "https://www.youtube.com/watch?v=2xiCVNwhrDU"


@app.route("/", methods=(["POST", "GET"]))
@cross_origin()
def get_captions():
    print(request)
    if request.method == "POST":
        try:
            data = request.get_json()
            url = data.get("youtube_url")
            caption_keys = caption_keywords(url)
            return jsonify(caption_keys)
        except:
            abort(400)

    elif request.method == "GET":
        return jsonify("hello_ world")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
