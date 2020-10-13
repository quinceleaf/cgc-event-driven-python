import boto3
import pandas as pd


def fetch_data(url):
    try:
        df = pd.read_csv(url)
        return True, df, []
    except:
        return False, None, [f"Error fetching dataset: {url}"]
