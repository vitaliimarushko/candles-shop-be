import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { Product } from "../../integrations/dynamo-db/models/Product";
import {
  PathParameters,
  PathParametersSchema,
} from "@functions/getProductsById/schema";
import { handlerTryCatch } from "@libs/handler-try-catch";
import { jsonResponse } from "@libs/json-response";
import { getProductById } from "../../integrations/dynamo-db";

export const main = handlerTryCatch(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const pathParameters: PathParameters = await PathParametersSchema.validate(
      event.pathParameters,
    );

    const { productId } = pathParameters;
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
