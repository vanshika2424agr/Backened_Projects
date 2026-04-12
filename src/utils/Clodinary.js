import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadtoCloudinary = async (localpath) => {
  try {
    if (!localpath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });

    console.log("File is uploaded in Cloudinary:", response.url);

    // ✅ delete local file after success
    fs.unlinkSync(localpath);

    return response;

  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    // ⚠️ safe delete
    if (fs.existsSync(localpath)) {
      fs.unlinkSync(localpath);
    }

    return null;
  }
};