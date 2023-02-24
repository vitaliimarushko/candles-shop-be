import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { products } from "../../mocks/data";
import { Product } from "../../models/Product";
import { pathParametersSchema } from "@functions/getProductsById/schema";
import { handlerTryCatch } from "@libs/handler-try-catch";
import { jsonResponse } from "@libs/json-response";

export const main = handlerTryCatch(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const { productId } = await pathParametersSchema.validate(
      event.pathParameters,
    );

    const product: Product | undefined = products.find((product: Product) => {
      return product.id === productId;
    });

    if (!product) {
      throw {
        statusCode: 404,
        message: `"${productId}" product ID doesn't exist`,
      };
    }

    return jsonResponse(product);
  },
);
