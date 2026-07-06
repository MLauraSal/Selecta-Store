export const uploadImagesToCloudinary = async (files, folder = "products") => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const fileArray = Array.from(files);

  const uploadPromises = fileArray.map(async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

   if (!response.ok) {
  const errorData = await response.json();
  throw new Error(
    errorData?.error?.message || "Error uploading image to Cloudinary"
  );
}

    const data = await response.json();
    return data.secure_url;
  });

  return Promise.all(uploadPromises);
};

export const uploadProfileImage = async (file) => {
  const urls = await uploadImagesToCloudinary([file], "users");
  return urls[0];
};