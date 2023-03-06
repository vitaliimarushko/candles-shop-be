import * as Yup from "yup";

export const StockSchema = Yup.object({
  product_id: Yup.string(),
  count: Yup.number().positive().required().defined().default(0),
});

export type Stock = Yup.InferType<typeof StockSchema>;
