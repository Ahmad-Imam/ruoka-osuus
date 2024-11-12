/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "higssmppvjoqahjxesne.supabase.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "hheakidhvgpegldaqczr.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
