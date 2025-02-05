import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['*']
  },
  redirects: async () => {
    return [
      {
        source: "/article/:id",
        destination: "/articles/:id",
        permanent: true
      }, {
        source: "/articles",
        destination: "/",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
