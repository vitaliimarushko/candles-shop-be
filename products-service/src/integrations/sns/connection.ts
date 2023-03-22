import * as AWS from "aws-sdk";

const region = process.env.AWS_REGION;

export const snsConfigs = {
  region,
  topicArn: process.env.SNS_TOPIC_ARN,
};

AWS.config.update({
  region,
});

export const snsClient = new AWS.SNS({
  region,
});
