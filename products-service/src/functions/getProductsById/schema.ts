import * as Yup from "yup";

export const RequestDataSchema = Yup.object({
  productId: Yup.string()
    .min(1, "Wrong product ID format")
    .required("Product ID is required"),
});

export type RequestData = Yup.InferType<typeof RequestDataSchema>;
