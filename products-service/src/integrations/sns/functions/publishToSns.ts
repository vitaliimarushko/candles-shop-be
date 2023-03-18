import { snsClient, snsConfigs } from "../connection";

export const publishToSns = async (data: any) => {
  console.info(">>> Data is going to be published to SNS...");

  await snsClient
    .publish({
      Subject: "Products created",
      Message: JSON.stringify(data),
      TopicArn: snsConfigs.topicArn,
    })
    .promise();

  console.info(">>> Data published to SNS successfully");
};
