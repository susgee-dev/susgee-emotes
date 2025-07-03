'use server';

import helix from '@/lib/api/helix';
import tla from '@/lib/api/tla';
import { ChannelData } from '@/types/emotes';

export async function fetchChannelData(username: string): Promise<ChannelData> {
	if (!username || !/^[a-zA-Z0-9_]{3,25}$/.test(username)) {
		throw new Error('Invalid channel name');
	}

	const channel = await tla.getUser(username);

	if (!channel) {
		throw new Error('Channel not found');
	}

	const [twitchEmotes, twitchBadges] = await Promise.all([
		helix.getChannelEmotes(channel.id),
		helix.getChannelBadges(channel.id)
	]);

	return {
		channel,
		emotes: {
			twitch: twitchEmotes
		},
		badges: {
			twitch: twitchBadges
		}
	};
}
