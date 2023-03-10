import * as AWS from "aws-sdk";
import * as serverlessConfigs from "../../../serverless";

const { environment, region } = (serverlessConfigs as any).provider;
const { BUCKET_NAME } = environment;

export const s3Configs = {
  bucketName: process.env.BUCKET_NAME || BUCKET_NAME,
};

AWS.config.update({
  region,
});

export const s3Client = new AWS.S3({ region });
