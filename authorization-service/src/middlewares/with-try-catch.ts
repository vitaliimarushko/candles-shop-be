import { jsonResponse } from "../utils/helpers/json-response";

export const withTryCatch = (handler: (event: any) => Promise<any>) => {
  return async (event: any): Promise<any> => {
    try {
      return await handler(event);
    } catch (error: any) {
      const {
        message: errorMessage,
        validationMessage,
        statusCode,
      } = error || {};

      const message =
        errorMessage || validationMessage || "Internal server error";

      console.error(`>>> ${message}`);

      return jsonResponse({ message }, statusCode || 500);
    }
  };
};
