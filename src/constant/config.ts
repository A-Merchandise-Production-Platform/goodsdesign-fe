export const envConfig = () => {
  return {
    apiUrl:
      process.env.NEXT_PUBLIC_API_URL || 'https://api.goodsdesign.uydev.id.vn',
    ioUrl: process.env.NEXT_PUBLIC_IO_URL || "http://api.goodsdesign.uydev.id.vn",
  };
};
