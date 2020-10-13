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

    results = table.query(KeyConditionExpression=Key("PK").eq("DATAPOINT"),
        ProjectionExpression="#date,cases,deaths,recovered",
        ExpressionAttributeNames={
        "#date": "date",
        },
    )
    transformed_results = transform_results(results["Items"])

    response["body"] = json.dumps(transformed_results)
    response["statusCode"] = 200

    return response


def transform_results(results):
    return_data = []

    for record in results:
        temp = {}
        for key, value in record.items():
            temp[key] = str(record[key])
        return_data.append(temp)

    return return_data

