export const envConfig = () => {
  return {
    apiUrl:
      process.env.NEXT_PUBLIC_API_URL || 'https://api.goodsdesign.uydev.id.vn',
    ioUrl: process.env.NEXT_PUBLIC_IO_URL || "https://api.goodsdesign.uydev.id.vn",
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
      apiKey: process.env.CLOUDINARY_API_KEY || "",
      apiSecret: process.env.CLOUDINARY_API_SECRET || ""
    },
  };
};
