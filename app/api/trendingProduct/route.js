import Categories from "@/app/(root)/categories/page";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/model/category";
import { Product } from "@/model/product";
import { Tranding } from "@/model/trandingProduct";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    mongooseConnect();
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "parent",
          as: "children",
        },
      },
    ]);

    const trProduct = await Tranding.findOne({}).populate("TrndProduct");

    return NextResponse.json({
      category: categories.filter((category) => category.children.length > 0),
      trProduct,
    });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    mongooseConnect();
    const { productId, category_name } = await req.json();
    console.log(category_name);
    
    let trandingDoc = await Tranding.findOne();

    if (trandingDoc) {
      trandingDoc.TrndProduct.push(productId);
      trandingDoc.CategoryName.push(category_name);
      await trandingDoc.save();
    } else if (productId) {
      trandingDoc = await Tranding.create({
        TrndProduct: [productId],
        CategoryName: [category_name],
      });
    }

    return NextResponse.json(trandingDoc);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
