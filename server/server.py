import json
from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin

from captions import caption_keywords

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


URL = "https://www.youtube.com/watch?v=2xiCVNwhrDU"


@app.route("/", methods=(["POST"]))
@cross_origin()
def get_captions():
    try:
        data = request.get_json()
        url = data.get("youtube_url")
        caption_keys = caption_keywords(url)
        return jsonify(caption_keys)
    except:
        abort(404)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
