import { Readable } from "node:stream";
import { basename } from "node:path";
import { APIGatewayProxyResult, S3Event } from "aws-lambda";
import { withTryCatch } from "../../middlewares/with-try-catch";
import { jsonResponse } from "../../utils/helpers/json-response";
import { s3Client, s3Configs } from "../../integrations/s3";
import { sendMessage } from "../../integrations/sqs";
import { CreateProductType } from "./schema";

const csv = require("csv-parser");

const handleStream = (readableStream: Readable) => {
  return new Promise((resolve, reject) => {
    readableStream
      .pipe(csv())
      .on("data", async (chunk: CreateProductType) => {
        await sendMessage(chunk);
      })
      .on("error", (error: any) => {
        reject(error?.message || error || "S3 file can't be read");
      })
      .on("end", () => {
        resolve(void 0);
      });
  });
};

const moveFileToParsed = async (fileKey: string) => {
  const filename = basename(fileKey);

  await s3Client
    .copyObject({
      Bucket: s3Configs.bucketName,
      CopySource: `${s3Configs.bucketName}/${fileKey}`,
      Key: `parsed/${filename}`,
    })
    .promise();

  await s3Client
    .deleteObject({
      Bucket: s3Configs.bucketName,
      Key: fileKey,
    })
    .promise();
};

export const main = withTryCatch(
  async (event: S3Event): Promise<APIGatewayProxyResult> => {
    const fileKey: string = event.Records[0]?.s3.object.key;
    const params = {
      Bucket: s3Configs.bucketName,
      Key: fileKey,
    };

    const s3Stream = s3Client.getObject(params).createReadStream();

    await handleStream(s3Stream);
    await moveFileToParsed(fileKey);

    return jsonResponse({});
  },
);
