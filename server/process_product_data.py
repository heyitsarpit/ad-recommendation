import pandas as pd


def process_product_data():
    data = pd.read_csv("./data/flipkart.csv", usecols=["product_name"])
    data_lower_list = [x for x in data["product_name"].str.lower()]
    data_lower_frame = pd.DataFrame(data_lower_list, columns=["product_name"])
    data_lower_frame.to_csv("./data/flipkart_processed.csv", sep="\t", index=False)


if __name__ == "__main__":
    process_product_data()

# if __name__ == "__main__":
#     captions = ProductSearch(
#         "https://www.youtube.com/watch?v=2xiCVNwhrDU", "Sorensen Dice"
#     )
#     print(captions.get_products())