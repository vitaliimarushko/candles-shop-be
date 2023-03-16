import { APIGatewayEvent } from "aws-lambda";
import * as Yup from "yup";

interface ValidateEventParamsInterface {
  event: APIGatewayEvent;
  schema: Yup.Schema;
  field: string;
}

/**
 * Ensures valid event parameters for HTTP request based on provided schema
 *
 * @param { ValidateEventParamsInterface } params
 */
export const validateEvent = async (params: ValidateEventParamsInterface) => {
  const { event, schema, field } = params;
  let requestData;

  console.info(`>>> Incoming event:`, JSON.stringify(event));

  const valueToValidate =
    typeof event[field] === "string" ? JSON.parse(event[field]) : event[field];

  try {
    requestData = await schema.validate(valueToValidate || {});
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
