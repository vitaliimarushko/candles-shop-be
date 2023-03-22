import * as AWS from "aws-sdk";

const region = process.env.AWS_REGION;

export const sqsConfigs = {
  catalogItemsQueue: process.env.CATALOG_ITEMS_QUEUE,
};

AWS.config.update({
  region,
});

export const sqsClient = new AWS.SQS({ region });
