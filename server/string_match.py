import collections
import textdistance

# self done
def jaccard_similarity(list1, list2):
    s1 = set(list1)
    s2 = set(list2)
    return len(s1.intersection(s2)) / len(s1.union(s2))


def levenshtein_distance(a, b):
    "Calculates the Levenshtein distance between a and b."
    n, m = len(a), len(b)
    if n > m:
        # Make sure n <= m, to use O(min(n,m)) space
        a, b = b, a
        n, m = m, n

    current = range(n + 1)
    for i in range(1, m + 1):
        previous, current = current, [i] + [0] * n
        for j in range(1, n + 1):
            add, delete = previous[j] + 1, current[j - 1] + 1
            change = previous[j - 1]
            if a[j - 1] != b[i - 1]:
                change = change + 1
            current[j] = min(add, delete, change)
    return current[n]


def ratcliff_obershelp_similarity(s1, s2):
    intersect = collections.Counter(s1) & collections.Counter(s2)
    matches = sum(intersect.values())
    return 2.0 * matches / (len(s1) + len(s2))


# Letter based
def hamming(s1, s2):
    return textdistance.hamming.normalized_similarity(s1, s2)


def levenshtein(s1, s2):
    return textdistance.levenshtein.normalized_similarity(s1, s2)


def jaro_winkler(s1, s2):
    return textdistance.jaro_winkler.similarity(s1, s2)


# Token based
def jaccard(s1, s2):
    l1, l2 = s1.split(" "), s2.split(" ")
    return textdistance.jaccard(l1, l2)


def sorensen_dice(s1, s2):
    l1, l2 = s1.split(" "), s2.split(" ")
    return textdistance.sorensen_dice(l1, l2)


# Sequence based
def ratcliff_obershelp(s1, s2):
    return textdistance.ratcliff_obershelp.similarity(s1, s2)
