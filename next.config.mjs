/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://127.0.0.1:3000", "http://localhost:3000"],
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'i.scdn.co',
      pathname: '/image/**',
    },
  ],
},
};


export default nextConfig;

