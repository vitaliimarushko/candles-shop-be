import * as AWS from "aws-sdk";

const region = process.env.AWS_REGION;

export const s3Configs = {
  bucketName: process.env.BUCKET_NAME,
};

AWS.config.update({
  region,
});

export const s3Client = new AWS.S3({ region });
