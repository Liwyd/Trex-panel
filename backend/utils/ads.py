from datetime import datetime
import requests

ads_cache = None
ads_cache_time = None


def get_ads_from_github() -> dict:
    global ads_cache, ads_cache_time

    if (
        ads_cache
        and ads_cache_time
        and (datetime.now().timestamp() - ads_cache_time) < 3600
    ):
        return ads_cache

    try:
        # Since the project no longer has sponsors, returning an empty response
        ads_data = {}
        ads_cache = ads_data
        ads_cache_time = datetime.now().timestamp()
        return ads_cache

    except (requests.RequestException, ValueError):
        default_ads = {}
        ads_cache = default_ads
        ads_cache_time = datetime.now().timestamp()
        return default_ads