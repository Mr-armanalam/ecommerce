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

    const populatedDoc = await Tranding.findById(trandingDoc._id).populate(
      "TrndProduct"
    );

    return NextResponse.json(populatedDoc);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await mongooseConnect();
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get("_id");
    const category = searchParams.get("_category");

    if (!productId)
      return NextResponse.json("Something went wrong", { status: 400 });

    await Tranding.updateOne(
      { TrndProduct: productId },
      { $pull: { TrndProduct: productId, CategoryName: category } }
    );

    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    console.error(error.message);
    return Error("Error while deleting product: ", { status: 400 });
  }
}
