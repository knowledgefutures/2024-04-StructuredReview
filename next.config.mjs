/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export',
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			async_hooks: false, // Prevents it from trying to load async_hooks
		};
		return config;
	},
};

export default nextConfig;
