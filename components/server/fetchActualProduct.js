'use server'

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/product";

export const fetchActualProduct = async (categoryId) => {
  try {
    await mongooseConnect();
    const product = await Product.find({ category: categoryId})
    .select('_id title');    
    return JSON.stringify(product);
  } catch (error) {
    console.error(error);
    return [];
  }
}

