from __future__ import print_function
import datetime as dt
import os
import boto3

TOPIC_ARN = os.environ["TOPIC_ARN"]

sns = boto3.client("sns")


def filter_for_checkpoint(record):
    if record["dynamodb"]["NewImage"]["PK"] == "CHECKPOINT":
        return True


def lambda_handler(event, context):
    latest_datapoint = ""

    for record in event["Records"]:
        if filter_for_checkpoint(record):
            latest_datapoint = record["dynamodb"]["NewImage"]["last_successful_run"]
        print(record["eventID"])
        print(record["eventName"])
        print("record:")
        print(record)

    latest_datapoint_dt = dt.strptime(latest_datapoint, "%Y-%m-%d")
    latest_datapoint_str = latest_datapoint_dt.strftime("%A, %B %d, %Y")

    if (len(event["Records"]) - 1) == 1:
        message = f"CGC COVID Visualization updated with {len(event['Records']) - 1} day's new records. Dataset is now complete through: {latest_datapoint_str}"
    else:
        message = f"CGC COVID Visualization updated with {len(event['Records']) - 1} days' new records. Dataset is now complete through: {latest_datapoint_str}"

    response = sns.publish(
        TopicArn=TOPIC_ARN,
        Message=message,
    )
