import * as Yup from "yup";

export const RequestDataSchema = Yup.object({
  name: Yup.string().min(1).required(),
});

export type RequestBody = Yup.InferType<typeof RequestDataSchema>;
