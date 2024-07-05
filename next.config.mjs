/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["res.cloudinary.com"],
	},
	redirects: async () => {
		return [
			{
				source: "/admin",
				destination: "/admin/dashboard",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
