import { Schema, model, models, Types } from "mongoose";

const TrandingSchema = new Schema(
  {
    product: [{ type: Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const Tranding = models.Tranding || model("Tranding", TrandingSchema);
