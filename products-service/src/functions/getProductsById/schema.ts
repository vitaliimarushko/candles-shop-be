import * as Yup from "yup";

export const pathParametersSchema = Yup.object({
  productId: Yup.string()
    .min(1, "Wrong product ID format")
    .required("Product ID is required"),
});
