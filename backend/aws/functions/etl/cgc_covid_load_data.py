import datetime as dt
import os

import boto3
from boto3.dynamodb.conditions import Key, Attr


table_name = os.environ["TABLE_NAME"]
dynamodb = boto3.client("dynamodb")


def load_data(data_combined):
    errors = []

    try:
        res = dynamodb.get_item(
            TableName=table_name,
            Key={
                "PK": {
                    "PK": {"S": "CHECKPOINT"},
                    "date": {"S": "CHECKPOINT"},
                }
            },
        )
        load_type = "INCREMENTAL"
        last_successful_run = res.get["last_successful_run"]
    except:
        load_type = "INITIAL"
        last_successful_run = None

    if load_type == "INITIAL":
        data_load = data_combined
    else:
        query_str = f'date > "{last_successful_run}"'
        data_load = data_combined.query(query_str)

    latest_datapoint = data_load.index[-1].to_pydatetime().strftime("%Y-%m-%d")

    if load_type == "INITIAL":

        for date in data_load.index:

            load_date_dt = date.to_pydatetime()
            load_date = load_date_dt.strftime("%Y-%m-%d")
            load_cases = str(data_load["Cases"][date])
            load_deaths = str(data_load["Deaths"][date])
            load_recovered = str(data_load["Recovered"][date])

            try:
                response = dynamodb.put_item(
                    TableName=table_name,
                    Item={
                        "PK": {"S": "DATAPOINT"},
                        "date": {"S": load_date},
                        "cases": {
                            "N": load_cases,
                        },
                        "deaths": {
                            "N": load_deaths,
                        },
                        "recovered": {
                            "N": load_recovered,
                        },
                    },
                    ConditionExpression="attribute_not_exists(SK)",
                )
            except:
                print(f"Error loading database for record: DATAPOINT-{load_date}")
                errors.append(
                    f"Error loading database for record: DATAPOINT-{load_date}"
                )

        try:
            response = dynamodb.put_item(
                TableName=table_name,
                Item={
                    "PK": {"S": "CHECKPOINT"},
                    "date": {"S": "CHECKPOINT"},
                    "last_successful_run": {
                        "S": latest_datapoint,
                    },
                },
            )
        except:
            print(f"Error loading database for record: CHECKPOINT")
            errors.append(f"Error loading database for record: CHECKPOINT")

    else:
        transaction_queue = []

        for date in data_load.index:

            load_date_dt = date.to_pydatetime()
            load_date = load_date_dt.strftime("%Y-%m-%d")
            load_cases = str(data_load["Cases"][date])
            load_deaths = str(data_load["Deaths"][date])
            load_recovered = str(data_load["Recovered"][date])

            datapoint_create = {
                "Put": {
                    "TableName": table_name,
                    "Item": {
                        "PK": {"S": "DATAPOINT"},
                        "date": {"S": load_date},
                        "cases": {
                            "N": load_cases,
                        },
                        "deaths": {
                            "N": load_deaths,
                        },
                        "recovered": {
                            "N": load_recovered,
                        },
                    },
                    "ConditionExpression": "attribute_not_exists(SK)",
                    "ReturnValuesOnConditionCheckFailure": "ALL_OLD",
                },
            }
            transaction_queue.append(datapoint_create)

        checkpoint_create_or_update = {
            "Put": {
                "TableName": table_name,
                "Item": {
                    "PK": {"S": "CHECKPOINT"},
                    "date": {"S": "CHECKPOINT"},
                    "last_successful_run": {
                        "S": latest_datapoint,
                    },
                },
            },
        }
        transaction_queue.append(checkpoint_create_or_update)
        try:
            results = dynamodb.transact_write_items(TransactItems=transaction_queue)
            print(f"Successfully loaded {len(transaction_queue) - 1} datapoints")
        except:
            print("Error on loading to database")
            errors.append("Error on loading to database")

    if len(errors) == 0:
        return True, None, errors
    else:
        return False, len(transaction_queue) - 1, errors