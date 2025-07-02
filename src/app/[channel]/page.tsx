import { Metadata } from 'next';

import ClientPage from './client';

type PageParams = {
	params: Promise<{ channel: string }>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	const { channel } = await params;

	if (!channel || channel.length > 25 || !/^[a-zA-Z0-9_]{3,25}$/.test(channel)) {
		return {
			title: 'Invalid Channel',
			description: 'Please enter a valid Twitch channel name'
		};
	}

	return {
		title: `${channel}'s Twitch Emotes`,
		description: `Twitch channel emotes from ${channel}`,
		openGraph: {
			title: `${channel} - Twitch Channel Emotes`,
			description: `Browse through twitch channel emotes from ${channel}`
		}
	};
}

export default async function ChannelPage({ params }: PageParams) {
	const { channel } = await params;

	return <ClientPage channel={channel} />;
}
