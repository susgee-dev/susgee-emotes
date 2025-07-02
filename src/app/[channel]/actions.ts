'use server';

import helix from '@/lib/api/helix';
import { EmoteData } from '@/types/emotes';

export async function fetchChannelData(channel: string): Promise<EmoteData> {
	if (!channel || channel.length > 25 || !/^[a-zA-Z0-9_]{3,25}$/.test(channel)) {
		throw new Error('Invalid channel name');
	}

	const channelId = await helix.getUserId(channel);

	if (!channelId) {
		throw new Error('Channel not found');
	}

	const [twitchEmotes, twitchBadges] = await Promise.all([
		helix.getChannelEmotes(channelId),
		helix.getChannelBadges(channelId)
	]);

	return {
		emotes: {
			twitch: twitchEmotes
		},
		badges: {
			twitch: twitchBadges
		}
	};
}
