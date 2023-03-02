import * as Yup from "yup";

export const PathParametersSchema = Yup.object({
  productId: Yup.string()
    .min(1, "Wrong product ID format")
    .required("Product ID is required"),
});

export type PathParameters = Yup.InferType<typeof PathParametersSchema>;
