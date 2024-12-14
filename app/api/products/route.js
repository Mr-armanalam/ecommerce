import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongooseConnect();

    const { title, description, price, images, category } = await req.json();
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
    });

    return NextResponse.json(productDoc, { status: "200" });
  } catch (error) {
    return NextResponse.status(500).json({ message: "Error creating product" });
  }
}
export async function GET(request) {
  try {
    await mongooseConnect();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("id");
    // console.log(query);
    if (query) {
      return NextResponse.json(await Product.findOne({ _id: query }), {
        status: "200",
      });
    } else {
      return NextResponse.json(await Product.find(), { status: "200" });
    }
  } catch (error) {
    return NextResponse.json("Error fetching product", { status: "200" });
  }
}

export async function PUT(req) {
  try {
    await mongooseConnect();
    const { title, description, price, _id, images, category } =
      await req.json();
    await Product.findByIdAndUpdate(
      _id,
      { title, description, price, images, category },
      { new: true }
    );
    return NextResponse.json("Product Details Updated", { status: "200" });
  } catch (error) {
    return NextResponse.status(500).json({ message: "Error updating product" });
  }
}

export async function DELETE(req) {
  try {
    await mongooseConnect();
    const searchParams = req.nextUrl.searchParams;
    const Id = searchParams.get("id");
    await Product.deleteOne({ _id: Id });
    return NextResponse.json("Product deleted successfully", { status: "200" });
  } catch (error) {
    return NextResponse.status(500).json({ message: "Error deleting product" });
  }
}
