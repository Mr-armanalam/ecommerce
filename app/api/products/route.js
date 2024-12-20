import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/product";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await mongooseConnect();
    await isAdminRequest();

    const { title, description, price, images, category, properties } =
      await req.json();
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
    });

    return NextResponse.json(productDoc, { status: "200" });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500});
  }
}
export async function GET(request) {
  try {
    await mongooseConnect();
    await isAdminRequest();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("id");
    if (query) {
      return NextResponse.json(await Product.findOne({ _id: query }), {
        status: "200",
      });
    } else {
      return NextResponse.json(await Product.find(), { status: "200" });
    }
  } catch (error) {
    return NextResponse.json(error.message, { status: "200" });
  }
}

export async function PUT(req) {
  try {
    await mongooseConnect();
    await isAdminRequest();
    const {
      title,
      description,
      price,
      images,
      category,
      properties,
      _id,
    } = await req.json();
    await Product.findByIdAndUpdate(
      _id,
      { title, description, price, images, category, properties },
      { new: true }
    );
    return NextResponse.json("Product Details Updated", { status: "200" });
  } catch (error) {
    return NextResponse.json(error.message, { status: "500" });
  }
}

export async function DELETE(req) {
  try {
    await mongooseConnect();
    await isAdminRequest();
    const searchParams = req.nextUrl.searchParams;
    const Id = searchParams.get("id");
    await Product.deleteOne({ _id: Id });
    return NextResponse.json("Product deleted successfully", { status: "200" });
  } catch (error) {
    return NextResponse.json( error.message ,{status: 500});
  }
}
