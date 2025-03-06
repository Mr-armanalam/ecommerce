import { Schema, model, models, Types } from "mongoose";

const TrandingSchema = new Schema(
  {
    TrndProduct: [{ type: Types.ObjectId, ref: "Product", unique: true }],
    CategoryName: [{ type: String, require: true, default: null}],
  },
  { timestamps: true }
);

export const Tranding = models.Tranding || model("Tranding", TrandingSchema);
