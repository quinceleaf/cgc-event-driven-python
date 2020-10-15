import os
import sys

import boto3

from cgc_covid_fetch_data import fetch_data
from cgc_covid_transform_data import transform_data
from cgc_covid_load_data import load_data

# SOURCE: The New York Times
# URL: https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv
# STRUCTURE: date,cases,deaths

# SOURCE: The Johns Hopkins University
# URL: https://raw.githubusercontent.com/datasets/covid-19/master/data/time-series-19-covid-combined.csv
# STRUCTURE: Date,Country/Region,Province/State,Lat,Long,Confirmed,Recovered,Deaths


TABLE_NAME = os.environ["TABLE_NAME"]
TOPIC_ARN = os.environ["TOPIC_ARN"]

URL_DATASET_JHU = os.environ["URL_DATASET_JHU"]
URL_DATASET_NYT = os.environ["URL_DATASET_NYT"]

sns = boto3.client("sns")


def publish_to_sns(error_message):
    # publishes error message to SNS topic for interested consumers

    response = sns.publish(
        TopicArn=TOPIC_ARN,
        Message=error_message,
    )


def lambda_handler(event, context):

    # Fetch datasets
    try:
        success, data_nyt, errors = fetch_data(URL_DATASET_NYT)
        if success:
            print("Retrieved NYT dataset")
        else:
            print(errors)

        success, data_jhu, errors = fetch_data(URL_DATASET_JHU)
        if success:
            print("Retrieved JHU dataset")
        else:
            print(errors)
    except:
        error_message = "Could not retrieve datasets"
        publish_to_sns(error_message)
        print(error_message)
        sys.exit(error_message)

    # Transform data
    try:
        success, data_combined, errors = transform_data(data_nyt, data_jhu)
        if success:
            print("Transformed datasets")
        else:
            print(errors)
    except:
        error_message = "Could not transform datasets"
        publish_to_sns(error_message)
        print(error_message)
        sys.exit(error_message)

    # Load data
    try:
        success, records_added, errors = load_data(data_combined)
        if success:
            print(f"Loaded {records_added} new records")
        else:
            print(errors)
    except:
        error_message = "Could not load to database"
        publish_to_sns(error_message)
        print(error_message)
        sys.exit(error_message)

    return
