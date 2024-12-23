import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/model/Order.model";
import { Product } from "@/model/product";
import { getServerSession } from "next-auth";
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

// import { mongooseConnect } from "@/lib/mongoose";
// import { Order } from "@/model/Order.model";
// import { NextResponse } from "next/server";

// export async function GET (req) {
//   try {
//     await mongooseConnect();
//     return NextResponse.json(await Order.find({}).sort({createdAt:-1}));
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
