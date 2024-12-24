import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/product";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function POST(req) {
  try {
    await mongooseConnect();
    const session = await getServerSession(authOptions);
    // console.log(session);
    
    const adminUser = session.user.id;

    const { title, description, price, images, category, properties, totalItem } =
      await req.json();
    const productDoc = await Product.create({
      adminUser,
      title,
      description,
      price,
      images,
      category,
      properties,
      totalItem
    });

    return NextResponse.json(productDoc, { status: "200" });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500});
  }
}
export async function GET(request) {
  try {
    await mongooseConnect();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("id");
    const session = await getServerSession(authOptions);
    const adminUser = session.user.id;
    
    if (query) {
      return NextResponse.json(await Product.findOne({ _id: query }), {
        status: "200",
      });
    } else {
      
      return NextResponse.json(await Product.find({adminUser}), { status: "200" });
    }
  } catch (error) {
    return NextResponse.json(error.message, { status: "200" });
  }
}

export async function PUT(req) {
  try {
    await mongooseConnect();
    const session = await getServerSession(authOptions);
    const adminUser = session.user.id;
    const {
      title,
      description,
      price,
      images,
      category,
      properties,
      totalItem,
      _id,
    } = await req.json();
    await Product.findByIdAndUpdate(
      _id,
      { title, description, price, images, category, properties, adminUser, totalItem },
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
    const searchParams = req.nextUrl.searchParams;
    const Id = searchParams.get("id");
    await Product.deleteOne({ _id: Id });
    return NextResponse.json("Product deleted successfully", { status: "200" });
  } catch (error) {
    return NextResponse.json( error.message ,{status: 500});
  }
}
