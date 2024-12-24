import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/model/Order.model";
import { Product } from "@/model/product";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    await mongooseConnect();
    const { id } = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const allProductsIds = await Product.find({ adminUser: id })
      .select("_id")
      .sort({ createdAt: -1 });

    const productIds = allProductsIds.map(id => new ObjectId(id));
    const AllOrders = await Order.find({products: {$in: productIds}}).sort({ createdAt: -1 });

    return NextResponse.json(AllOrders);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function PUT(req) {
  try {
    await mongooseConnect();
    const { _id, productsIds } = await req.json();
    console.log(productsIds);
    
    await Order.findByIdAndUpdate({_id},{status: 'shipped'},{new: true});
    await Product.updateMany({_id: {$in: productsIds}}, {$inc: {sells: 1 }})
    return NextResponse.json({success: true}, { status: "200" });
  } catch (error) {
    console.log(error.message);
    
    throw new Error({success : false, message : error.message});
  }
}
