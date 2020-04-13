import json
from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin

from captions import Captions

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"



@app.route("/", methods=(["POST"]))
@cross_origin()
def get_captions():
    try:
        data = request.get_json()
        url = data.get("youtube_url")
        captions = Captions(url)
        caption_keys = captions.get_keywords()

        return jsonify(caption_keys)
    except:
        abort(404)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
