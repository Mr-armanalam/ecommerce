import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  line_items: Object,
  name: String,
  email: String,
  city: String,
  postalCode: String,
  landmark: String,
  country: String,
  status: {type: String, default: 'new'},
  paid: Boolean,
}, {timestamps: true});


export const Order = models.Order || model("Order", OrderSchema);