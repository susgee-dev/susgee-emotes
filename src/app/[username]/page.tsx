import { Metadata } from 'next';

import ClientPage from './client';

type PageParams = {
	params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	const { username } = await params;

	if (!username || !/^[a-zA-Z0-9_]{3,25}$/.test(username)) {
		return {
			title: 'Invalid Channel',
			description: 'Please enter a valid Twitch channel name'
		};
	}

	return {
		title: `${username}'s Twitch Emotes`,
		description: `Twitch channel emotes from ${username}`,
		openGraph: {
			title: `${username} - Twitch Channel Emotes`,
			description: `Browse through twitch channel emotes from ${username}`
		}
	};
}

export default async function ChannelPage({ params }: PageParams) {
	const { username } = await params;

	return <ClientPage username={username} />;
}
