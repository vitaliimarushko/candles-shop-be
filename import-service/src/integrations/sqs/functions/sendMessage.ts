import { sqsClient, sqsConfigs } from "../connection";
import { CreateProductType } from "../../../functions/importFileParser/schema";

export const sendMessage = async (data: CreateProductType) => {
  const sqsMessage = JSON.stringify(data);

  console.info(">>> Message is going to be sent to SQS queue:", sqsMessage);

  await sqsClient
    .sendMessage({
      QueueUrl: sqsConfigs.catalogItemsQueue,
      MessageBody: sqsMessage,
    })
    .promise();

  console.info(">>> Message has been sent successfully");
};
