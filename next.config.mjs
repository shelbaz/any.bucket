/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/files",
        permanent: true,
      },
    ];
  },
  rewrites: () => [
    {
      source: "/blog/(.*?)([.]\\w{2,5})(\\?[^/]+)?",
      destination: "https://blog.file.rocks/$1$2$3",
    },
    {
      source: "/blog/([\\S\\s]+)/",
      destination: "https://blog.file.rocks/$1/",
    },
    {
      source: "/blog/posts/([\\S\\s]+)/",
      destination: "https://blog.file.rocks/posts",
    },
    {
      source: "/blog/posts/([\\S\\s]+)",
      destination: "https://blog.file.rocks/posts",
    },
    {
      source: "/blog",
      destination: "https://blog.file.rocks",
    },
  ],
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;
