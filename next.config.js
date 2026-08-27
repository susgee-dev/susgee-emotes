/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'static-cdn.jtvnw.net' },
			{ protocol: 'https', hostname: 'cdn.7tv.app' }
		]
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
					{ key: 'X-DNS-Prefetch-Control', value: 'on' }
				]
			}
		];
	},
	allowedDevOrigins: ['192.168.178.100']
};

module.exports = nextConfig;
