import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/model/category";
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
    console.log(trProduct);
    
    return NextResponse.json(
      {category : categories.filter((category) => category.children.length > 0), trProduct}
    );
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    mongooseConnect();
    const { productId } = await req.json();
    let trandingDoc = await Tranding.findOne();

    if (trandingDoc) {
      trandingDoc.TrndProduct.push(productId);
      await trandingDoc.save();
    } else if ( productId) {
      trandingDoc = await Tranding.create({ TrndProduct: [productId] });
    }

    return NextResponse.json(trandingDoc);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
