from cgc_covid_fetch_data import fetch_data
from cgc_covid_transform_data import transform_data
from cgc_covid_load_data import load_data

def lambda_handler(event, context):
    for record in event['Records']:
        print(record['eventID'])
        print(record['eventName'])
        print("record:")
        print(record)
    print('Successfully processed %s records.' % str(len(event['Records'])))

