        # if match_method == "Hamming":
        #     scores = [
        #         hamming(phrase, name)
        #         for name in data["product_name"].astype(str).values
        #     ]
        #     max_score = max(scores)
        #     found_products.append({"Key Phrase": phrase, "Score": max_score})
        # elif match_method == "Levenshtein":
        #     scores = [
        #         levenshtein(phrase, name)
        #         for name in data["product_name"].astype(str).values
        #     ]
        #     max_score = max(scores)
        #     found_products.append({"Key Phrase": phrase, "Score": max_score})
        # elif match_method == "Jaro-Winkler":
        #     scores = [
        #         jaro_winkler(phrase, name)
        #         for name in data["product_name"].astype(str).values
        #     ]
        #     max_score = max(scores)
        #     found_products.append({"Key Phrase": phrase, "Score": max_score})
        # elif match_method == "Jaccard":
        #     scores = [
        #         jaccard(phrase, name)
        #         for name in data["product_name"].astype(str).values
        #     ]
        #     max_score = max(scores)
        #     found_products.append({"Key Phrase": phrase, "Score": max_score})
        # elif match_method == "Sorensen Dice":
        #     scores = [
        #         sorensen_dice(phrase, name)
        #         for name in data["product_name"].astype(str).values
        #     ]
        #     max_score = max(scores)
        #     found_products.append({"Key Phrase": phrase, "Score": max_score})
        # elif match_method == "Ratcliff-Obershelp":
        #     scores = [
        #         ratcliff_obershelp(phrase, name)
        #         for name in data["product_name"].astype(str).values
        #     ]
        #     max_score = max(scores)
        #     found_products.append({"Key Phrase": phrase, "Score": max_score})
