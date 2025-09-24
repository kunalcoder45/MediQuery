// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   // Your other configurations like typescript, eslint, images go here
// //   typescript: {
// //     ignoreBuildErrors: true,
// //   },
// //   eslint: {
// //     ignoreDuringBuilds: true,
// //   },
// //   images: {
// //     remotePatterns: [
// //       {
// //         protocol: 'https',
// //         hostname: 'picsum.photos',
// //         port: '',
// //         pathname: '/**',
// //       },
// //     ],
// //   },
  
// //   // This is the rewrite function
// //   async rewrites() {
// //     return [
// //       {
// //         source: '/api/web3forms/:path*',
// //         destination: 'https://api.web3forms.com/:path*',
// //       },
// //     ];
// //   },
// // };

// // export default nextConfig;


// /** @type {import('next.NextConfig} */
// const nextConfig = {
//   // Your other configurations like typescript, eslint, images go here
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'picsum.photos',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
  
//   // CORS Proxy for your backend services
//   async rewrites() {
//     return [
//       // Existing rule for web3forms
//       {
//         source: '/api/web3forms/:path*',
//         destination: 'https://api.web3forms.com/:path*',
//       },
//       // New rule for your Auth service
//       // {
//       //   source: '/api/auth/:path*',
//       //   // destination: 'http://localhost:5000/api/auth/:path*',
//       //   destination: 'https://mediquery-auth-server.onrender.com/api/auth/:path*',
//       // },
//       // New rule for your Chat service
//       // {
//       //   source: '/api/chat/:path*',
//       //   // destination: 'http://localhost:8000/api/chat/:path*',
//       //   destination: 'https://mediquery-chat-server.onrender.com/api/chat/:path*',
//       // },
//     ];
//   },
//   experimental: {
//     // Enable the app directory (appDir) feature
//     appDir: true,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
