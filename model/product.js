import { model, models, Schema } from 'mongoose'

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, },
  price: { type: Number, required: true },
},{timestamps: true}
)

export const Product = models.Product || model('Product', ProductSchema);