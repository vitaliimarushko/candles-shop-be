import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { Product } from "../../integrations/dynamo-db/models/Product";
import {
  RequestData,
  RequestDataSchema,
} from "@functions/getProductsById/schema";
import { handlerTryCatch } from "@libs/handler-try-catch";
import { jsonResponse } from "@libs/json-response";
import { validateEvent } from "@libs/validate-event";
import { getProductById } from "../../integrations/dynamo-db";

export const main = handlerTryCatch(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const requestData: RequestData = await validateEvent({
      event,
      schema: RequestDataSchema,
      field: "pathParameters",
    });

    const { productId } = requestData;
    const product: Product | null = await getProductById(productId);

    if (!product) {
      throw {
        statusCode: 404,
        message: `"${productId}" product ID doesn't exist`,
      };
    }

    return jsonResponse(product);
  },
);
