import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ClientPage from './client';

import { getUserData } from '@/app/actions';

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

	try {
		const channel = await getUserData(username);

		if (channel) {
			const title = `${channel.bestName}'s Twitch emotes/badges`;
			const description = `Explore all Twitch emotes and badges for ${channel.bestName}, including subscriber tier emotes, follower emotes, and bit badges`;

			return {
				title,
				description,
				openGraph: {
					title,
					description,
					images: [
						{
							url: channel.avatar,
							width: 300,
							height: 300,
							alt: `${channel.bestName}'s profile picture`
						}
					]
				},
				twitter: {
					card: 'summary_large_image',
					title,
					description,
					images: [channel.avatar]
				}
			};
		}
	} catch {}

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

	if (!username || !/^[a-zA-Z0-9_]{3,25}$/.test(username)) {
		notFound();
	}

	const channel = await getUserData(username);

	if (!channel) {
		notFound();
	}

	return <ClientPage channel={channel} />;
}
