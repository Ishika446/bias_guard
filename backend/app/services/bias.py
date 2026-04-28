from collections import Counter

def detect_bias(countries):

    count = Counter(countries)
    total = sum(count.values())

    dominant_country = count.most_common(1)[0][0]
    ratio = count[dominant_country] / total

    if ratio > 0.7:
        risk = "High"
    elif ratio > 0.5:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "dominant_country": dominant_country,
        "bias_risk": risk,
        "country_distribution": dict(count)
    }