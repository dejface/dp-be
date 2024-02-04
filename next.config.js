/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.ctfassets.net",
            },
        ],
    },
    i18n: {
        locales: ["cs", "sk"],
        defaultLocale: "cs",
    },
};

module.exports = nextConfig;
