import * as Yup from "yup";

export const RequestDataSchema = Yup.object({
  title: Yup.string().min(1).required(),
  description: Yup.string().min(1).required(),
  price: Yup.number().positive().required(),
  count: Yup.number().positive().required(),
});

export type RequestData = Yup.InferType<typeof RequestDataSchema>;
