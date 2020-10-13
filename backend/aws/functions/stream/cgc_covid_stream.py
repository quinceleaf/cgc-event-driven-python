from __future__ import print_function
import datetime as dt
import os
import boto3

TOPIC_ARN = os.environ["TOPIC_ARN"]

sns = boto3.client("sns")


def publish_to_sns(last_datapoint, count):

    if count == 1:
        message = f"CGC COVID Visualization updated with {len(event['Records']) - 1} day's new records. Dataset is now complete through: {latest_datapoint}"
    else:
        message = f"CGC COVID Visualization updated with {len(event['Records']) - 1} days' new records. Dataset is now complete through: {latest_datapoint}"

    response = sns.publish(
        TopicArn=TOPIC_ARN,
        Message=message,
    )


def lambda_handler(event, context):

    latest_datapoint = None

    for record in event.get("Records"):
        if record.get("eventName") in ("INSERT", "MODIFY"):
            if record["NewImage"]["PK"]["S"] == "CHECKPOINT":
                latest_datapoint = record["NewImage"]["last_successful_run"]["S"]

    if latest_datapoint:
        publish_to_sns(latest_datapoint, len(event.get("Records")))
