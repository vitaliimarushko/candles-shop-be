import { SQSEvent } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { withTryCatch } from "../../middlewares/with-try-catch";
import { RequestData, RequestDataSchema } from "../createProduct/schema";
import { FullProduct } from "../../integrations/dynamo-db/models/FullProduct";
import { insertProduct } from "../../integrations/dynamo-db";

export const main = withTryCatch(async (event: SQSEvent): Promise<void> => {
  const records = event.Records;

  for (const idx in records) {
    const { body } = records[idx];
    let parsedData: RequestData;

    try {
      const data = JSON.parse(body);
      parsedData = await RequestDataSchema.validate(data);
    } catch (error) {
      console.error(`"${idx}" record has wrong format:`, body);
      continue;
    }

    const newFullProduct: FullProduct = {
      id: uuidv4(),
      title: parsedData.title,
      description: parsedData.description,
      price: parsedData.price || 0,
      count: parsedData.count || 0,
    };

    console.info(
      `>>> New product is going to be inserted...`,
      JSON.stringify(newFullProduct),
    );

    await insertProduct(newFullProduct);

    console.info(`New product was inserted successfully!`);
  }
});
