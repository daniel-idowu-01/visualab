import axios from "axios";

async function uploadToCloudinary(
  file: string | File,
  publicId: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
  formData.append("folder", "visualab-generated");
  formData.append("public_id", publicId);

  console.log("Uploading to Cloudinary...");
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    }
  );

  if (!res?.data?.secure_url) {
    throw new Error("No secure_url returned from Cloudinary");
  }

  console.log("Successfully uploaded to Cloudinary");
  return res.data.secure_url;
}

export default uploadToCloudinary;
