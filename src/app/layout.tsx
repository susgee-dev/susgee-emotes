import { Metadata } from 'next';
import { Outfit as Font } from 'next/font/google';
import Script from 'next/script';
import React from 'react';

import Footer from '@/components/footer';

import '@/styles/globals.css';

export const metadata: Metadata = {
	title: {
		default: 'Twitch Emotes/Badges Browser',
		template: '%s | susgee-dev'
	},
	description: 'Explore emotes and badges from any Twitch channel in one convenient place',
	authors: [{ name: 'maersux', url: 'https://github.com/maersux' }],
	publisher: 'susgee-dev',
	metadataBase: new URL('https://emotes.susgee.dev'),
	openGraph: {
		type: 'website',
		title: 'Twitch Emotes/Badges Browser',
		description:
			'View all emotes and badges from your favorite Twitch streamers - includes follow, subscriber, and bits content',
		siteName: 'susgee-emotes',
		url: 'https://emotes.susgee.dev',
		images: [
			{
				url: '/share_image.png',
				width: 800,
				height: 420,
				alt: 'Twitch Emotes/Badges Browser'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Twitch Emotes/Badges Browser',
		description:
			'Discover all emotes and badges from Twitch channels - perfect for finding your next subscription',
		images: ['/share_image.png']
	},
	other: {
		'darkreader-lock': ['darkreader-lock'],
		github: 'https://github.com/susgee-dev/susgee-emotes'
	}
};

const font = Font({
	subsets: ['latin']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html suppressHydrationWarning className={`${font.className} dark`} lang="en">
			<body className="flex min-h-dvh flex-col bg-gradient-bg bg-fixed text-font">
				<main className="mx-auto flex w-full max-w-[75rem] flex-1 flex-col gap-4 p-4">
					{children}
				</main>
				<Footer />
				{process.env.TRACKING_ID && (
					<Script
						defer
						data-site-id={process.env.TRACKING_ID}
						src="https://track.susgee.dev/api/script.js"
						strategy="afterInteractive"
					/>
				)}
			</body>
		</html>
	);
}
