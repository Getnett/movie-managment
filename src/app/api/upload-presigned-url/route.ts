import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3client = new S3Client({
  region: process.env.AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || "",
  },
});
export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType } = await request.json();
    console.log("fileName", fileName);
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const uploadURL = await getSignedUrl(s3client, command, {
      expiresIn: 60,
    });

    return NextResponse.json({ data: uploadURL }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}
