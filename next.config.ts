import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['*',"feucherolles.fr",                   "scontent-cdg4-3.xx.fbcdn.net",]
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
