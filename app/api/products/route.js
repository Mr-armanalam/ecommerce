import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongooseConnect();

    const { title, description, price } = await req.json();
    const productDoc = await Product.create({
      title,
      description,
      price,
    });

    return NextResponse.json(productDoc, { status: "200" });
  } catch (error) {
    return NextResponse.status(500).json({ message: "Error creating product" });
  }
}
export async function GET(req) {
  try {
    await mongooseConnect();

    return NextResponse.json(await Product.find());
  } catch (error) {
    return NextResponse.status(500).json({ message: "Error fetching product" });
  }
}
