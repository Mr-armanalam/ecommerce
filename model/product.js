import { model, models, Schema, Types } from 'mongoose'

const ProductSchema = new Schema({
  adminUser: { type: Types.ObjectId, ref: 'AdminUser' },
  title: { type: String, required: true },
  description: { type: String, },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: Types.ObjectId, ref: 'Category' },
  properties: { type: Object},
},{timestamps: true});

export const Product = models.Product || model('Product', ProductSchema);
