import boto3
import pandas as pd


def fetch_data(url):
    try:
        df = pd.read_csv(url)
        return True, df, []
    except pandas.errors.ParserError:
        return False, None, [f"Error parsing dataset: {url}"]
    except:
        return False, None, [f"Error fetching dataset: {url}"]
