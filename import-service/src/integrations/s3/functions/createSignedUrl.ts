import { s3Client, s3Configs } from "../connection";

const { bucketName } = s3Configs;

export const createSignedUrl = async (fileName: string) => {
  const params = {
    Bucket: bucketName,
    Key: `uploaded/${fileName}`,
    Expires: 60,
    ContentType: "text/csv",
  };

  return await s3Client.getSignedUrlPromise("putObject", params);
};
