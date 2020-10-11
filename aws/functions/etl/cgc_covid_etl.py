import os
import sys

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
URL_DATASET_JHU = os.environ["URL_DATASET_JHU"]
URL_DATASET_NYT = os.environ["URL_DATASET_NYT"]


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
        print("Could not retrieve datasets, exiting")
        sys.exit("Could not retrieve datasets, exiting")

    # Transform data
    try:
        success, data_combined, errors = transform_data(data_nyt, data_jhu)
        if success:
            print("Transformed datasets")
        else:
            print(errors)
    except:
        print("Could not transform datasets, exiting")
        sys.exit("Could not transform datasets, exiting")

    # Load data
    try:
        success, records_added, errors = load_data(data_combined)
        if success:
            print(f"Loaded {records_added} new records")
        else:
            print(errors)
    except:
        print("Could not load to database, exiting")
        sys.exit("Could not load to database, exiting")

    return
