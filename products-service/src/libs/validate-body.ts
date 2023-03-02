import { APIGatewayEvent } from "aws-lambda";
import * as Yup from "yup";

interface ValidateBodyParamsInterface {
  event: APIGatewayEvent;
  schema: Yup.Schema;
}

/**
 * Ensures valid body for HTTP request based on provided schema
 *
 * @param { ValidateBodyParamsInterface } params
 */
export const validateBody = async (params: ValidateBodyParamsInterface) => {
  const { event, schema } = params;
  let requestData;

  console.info(`>>> Incoming event body:`, JSON.stringify(event.body));

  try {
    requestData = await schema.validate(event.body);
  } catch (error) {
    throw {
      statusCode: 400,
      message: error.validationMessage || error.message || "Bad Request",
    };
  }

  return requestData;
};
