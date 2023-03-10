import { Readable } from "node:stream";
import { APIGatewayProxyResult, S3Event } from "aws-lambda";
import { handlerTryCatch } from "@libs/handler-try-catch";
import { jsonResponse } from "@libs/json-response";
import { s3Client, s3Configs } from "../../integrations/s3";

const csv = require("csv-parser");

const handleStream = (readableStream: Readable) => {
  const data = [];
  return new Promise((resolve, reject) => {
    readableStream
      .pipe(csv())
      .on("data", (chunk: Buffer) => {
        console.info(">>> Chunk:", JSON.stringify(chunk));
        data.push(chunk);
      })
      .on("error", (error: any) => {
        reject(error?.message || error || "S3 file can't be read");
      })
      .on("end", () => {
        resolve(data);
      });
  });
};

export const main = handlerTryCatch(
  async (event: S3Event): Promise<APIGatewayProxyResult> => {
    const fileKey: string = event.Records[0]?.s3.object.key;
    const params = {
      Bucket: s3Configs.bucketName,
      Key: fileKey,
    };

    const s3Stream = s3Client.getObject(params).createReadStream();
    const data = await handleStream(s3Stream);

    console.info(">>> All file data:", JSON.stringify(data));

    return jsonResponse({});
  },
);
