import json
import os

import boto3
from boto3.dynamodb.conditions import Key, Attr


TABLE_NAME = os.environ["TABLE_NAME"]


def lambda_handler(event, context):
    client = boto3.resource("dynamodb")
    table = client.Table(TABLE_NAME)

    response = {
        "isBase64Encoded": "false",
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
    }

    results = table.query(KeyConditionExpression=Key("PK").eq("CHECKPOINT"),
        ProjectionExpression="last_successful_run",
    )
    

    response["body"] = json.dumps(results["Items"])
    response["statusCode"] = 200

    return response
