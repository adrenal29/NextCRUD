import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const imageId = file.name.replaceAll(" ", "_");
  console.log(imageId);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + imageId),
      buffer
    );
    return NextResponse.json({ Message: "Success", status: 201, imageId }); // Include filename in the response
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
