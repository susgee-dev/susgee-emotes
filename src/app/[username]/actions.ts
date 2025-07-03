'use server';

import helix from '@/lib/api/helix';
import { ChannelData } from '@/types/emotes';

export async function fetchChannelData(channelId: string): Promise<ChannelData> {
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
