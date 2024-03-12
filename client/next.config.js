/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // TODO: Удалить домены
    domains: [
      "placehold.co",
      "secureservercdn.net",
      "api.qrserver.com",
      // "http://localhost:3333",
      "localhost",
      "encrypted-tbn0.gstatic.com",
      "encrypted-tbn1.gstatic.com",
      "encrypted-tbn2.gstatic.com",
      "c.dns-shop.ru",
    ],
  },
};

module.exports = nextConfig;
