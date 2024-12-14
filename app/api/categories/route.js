import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/model/category";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { name, parentCategory, properties } = await req.json();
  // console.log(mongoose.Types.ObjectId.isValid(parentCategory));

  await mongooseConnect();

  const categoryDoc = await Category.create({
    name,
    parent: parentCategory || undefined,
    properties,
  });
  console.log(categoryDoc);

  return NextResponse.json(
    { message: "category is saved successfully", categoryDoc: categoryDoc },
    { status: 200 }
  );
};

export const GET = async (req) => {
  await mongooseConnect();
  const categories = await Category.find({}).populate('parent');
  return NextResponse.json(categories, { status: 200 });
};

export const PUT = async (req) => {
  try {
    const { _id, name, parentCategory, properties } = await req.json();
    await mongooseConnect();
    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      { 
        name, 
        parent: parentCategory || undefined, 
        properties 
      },
      { new: true }
    ).populate('parent');
  
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, {status: 500})
  }
};

export const DELETE = async (req) => {
  try {
    await mongooseConnect();
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('_id');

    if (!query) return ;
    await Category.findByIdAndDelete(query);

    return NextResponse.json("ok", {status: 200});
  } catch (error) {
    return NextResponse.json(error.message, {status: 500})
  }
}