import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/model/category";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, isAdminRequest } from "../auth/[...nextauth]/route";

const handler = async (req) => {
  try {
    await mongooseConnect();
    // await isAdminRequest();

    if (req.method === "GET") {
      return NextResponse.json(await Category.find({}).populate("parent"), {
        status: 200,
      });
    }

    if (req.method === "POST") {
      const { name, parentCategory, properties } = await req.json();
      const categoryDoc = await Category.create({
        name,
        parent: parentCategory || undefined,
        properties,
      });

      return NextResponse.json(
        { message: "category is saved successfully", categoryDoc: categoryDoc },
        { status: 200 }
      );
    }

    if (req.method === "PUT") {
      const { _id, name, parentCategory, properties } = await req.json();
      const updatedCategory = await Category.findByIdAndUpdate(
        _id,
        {
          name,
          parent: parentCategory || undefined,
          properties,
        },
        { new: true }
      ).populate("parent");
      return NextResponse.json(updatedCategory, { status: 200 });
    }

    if (req.method === "DELETE") {
      const searchParams = req.nextUrl.searchParams;
      const query = searchParams.get("_id");

      if (!query) return;
      await Category.findByIdAndDelete(query);

      return NextResponse.json("ok", { status: 200 });
    }
  } catch (error) {
    console.log(error.message);
    
    return NextResponse.json(error.message , { status: 500 });
  }
};

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };



// export const GET = async (req) => {
//   await mongooseConnect();
//   // console.log(req.method);

//   const categories = await Category.find({}).populate('parent');
//   return NextResponse.json(categories, { status: 200 });
// };

// export const PUT = async (req) => {
//   try {
//     const { _id, name, parentCategory, properties } = await req.json();
//     await mongooseConnect();
//     const updatedCategory = await Category.findByIdAndUpdate(
//       _id,
//       {
//         name,
//         parent: parentCategory || undefined,
//         properties,
//       },
//       { new: true }
//     ).populate("parent");

//     return NextResponse.json(updatedCategory, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(error.message, { status: 500 });
//   }
// };

// export const DELETE = async (req) => {
//   try {
//     await mongooseConnect();
//     const searchParams = req.nextUrl.searchParams;
//     const query = searchParams.get("_id");

//     if (!query) return;
//     await Category.findByIdAndDelete(query);

//     return NextResponse.json("ok", { status: 200 });
//   } catch (error) {
//     return NextResponse.json(error.message, { status: 500 });
//   }
// };
