import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { withTryCatch } from "../../middlewares/with-try-catch";
import { validateEvent } from "../../utils/helpers/validate-event";
import { RequestBody, RequestDataSchema } from "./schema";
import { createSignedUrl } from "../../integrations/s3";
import { jsonResponse } from "../../utils/helpers/json-response";

export const main = withTryCatch(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const requestBody: RequestBody = await validateEvent({
      event,
      schema: RequestDataSchema,
      field: "queryStringParameters",
    });

    const url = await createSignedUrl(requestBody.name);

    return jsonResponse({
      url,
    });
  },
);
