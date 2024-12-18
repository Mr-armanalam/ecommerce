import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/model/Order.model";
import { NextResponse } from "next/server";

export async function GET (req) {
  try {
    await mongooseConnect();    
    return NextResponse.json(await Order.find({}).sort({createdAt:-1}));
  } catch (error) {
    throw new Error(error.message);
  }
}