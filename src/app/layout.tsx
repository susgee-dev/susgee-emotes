import { Metadata } from 'next';
import { Outfit as Font } from 'next/font/google';
import React from 'react';

import Footer from '@/components/footer';

import '@/styles/globals.css';

export const metadata: Metadata = {
	title: {
		default: 'susgee-dev',
		template: '%s | susgee-dev'
	},
	other: {
		'darkreader-lock': ['darkreader-lock']
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
			</body>
		</html>
	);
}
