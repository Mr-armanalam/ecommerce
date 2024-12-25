import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET,
});

export async function POST(req) {
  // await isAdminRequest();

  if (req.method === "POST") {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // const originalFilename = file.name.replaceAll(" ", "_");
    // const newFilename = `${path.parse(originalFilename).name}_${Date.now()}${path.extname(originalFilename)}`;
    const newFilename = `product_${Date.now()}`;
    const localFilePath = path.join(
      process.cwd(),
      "public/assets/",
      newFilename
    );

    try {
      await writeFile(localFilePath, buffer);
      const result = await cloudinary.uploader.upload(localFilePath, {
        // public_id: path.parse(newFilename).name,
        public_id: newFilename,
      });

      await unlink(localFilePath);
      return NextResponse.json(
        { message: "Success", url: result.secure_url },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      return NextResponse.json(error.message, { status: 500 });
    }
  } else {
    return NextResponse.json("Method not allowed", { status: 405 });
  }
}
