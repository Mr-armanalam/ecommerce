import { model, models, Schema, Types } from 'mongoose'

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: Types.ObjectId, ref: 'Category' },
},{timestamps: true}
)

export const Product = models.Product || model('Product', ProductSchema);