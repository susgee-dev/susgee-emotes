'use server';

import tla from '@/lib/api/tla';
import { ChannelData } from '@/types/emotes';

export async function fetchChannelData(channelId: string): Promise<ChannelData> {
	const [twitchEmotes, twitchBadges] = await Promise.all([
		tla.getChannelEmotes(channelId),
		tla.getChannelBadges(channelId)
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

export async function getEmoteDetails(emoteId: string): Promise<any> {
	return tla.getEmoteDetails(emoteId);
}
