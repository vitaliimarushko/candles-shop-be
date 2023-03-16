import { APIGatewayProxyResult, Handler, APIGatewayEvent } from "aws-lambda";
import { withTryCatch } from "../../middlewares/with-try-catch";
import { jsonResponse } from "../../utils/helpers/json-response";

export const main: Handler = withTryCatch(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    console.log("event:", event);

    const productsTable = process.env.PRODUCTS_TABLE_NAME;
    const stocksTable = process.env.STOCKS_TABLE_NAME;
    const someVar = process.env.SOME_VAR;

    const allProducts = {
      a: 10,
      b: 20,
      productsTable,
      stocksTable,
      someVar,
    };

    return jsonResponse(allProducts);
  },
);
