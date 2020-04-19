import json
from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin

from product_search import ProductSearch

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/", methods=(["POST"]))
@cross_origin()
def get_products():
    try:
        data = request.get_json()
        url = data.get("youtube_url")
        match_method = data.get("match_method")
        PS = ProductSearch(url, match_method)
        products = PS.get_products()

        return jsonify(products)
    except:
        abort(404)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
