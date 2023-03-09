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

  console.info(`>>> Incoming event:`, JSON.stringify(event));

  try {
    requestData = await schema.validate(JSON.parse(event.body));
  } catch (error) {
    const message = error.validationMessage || error.message || "Bad Request";
    console.error(`>>> ${message}`);
    throw {
      statusCode: 400,
      message,
    };
  }

  return requestData;
};
