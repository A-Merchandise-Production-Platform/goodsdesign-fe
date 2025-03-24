export const envConfig = () => {
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    ioUrl: process.env.NEXT_PUBLIC_IO_URL,
  };
};
