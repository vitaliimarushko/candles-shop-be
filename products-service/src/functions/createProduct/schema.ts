import * as Yup from "yup";

export const RequestBodySchema = Yup.object({
  title: Yup.string().min(1).required(),
  description: Yup.string().min(1).required(),
  price: Yup.number().positive().required().strict(),
  count: Yup.number().positive().required().strict(),
});

export type RequestBody = Yup.InferType<typeof RequestBodySchema>;
