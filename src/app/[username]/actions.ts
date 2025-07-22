'use server';

import tla from '@/lib/api/tla';
import { getCache } from '@/lib/cache';
import { ChannelData } from '@/types/emotes';

export async function fetchChannelData(channelId: string): Promise<ChannelData> {
	const channelCache = getCache<ChannelData>(`channel:${channelId}`);

	const cachedData = channelCache.get();

	if (cachedData !== null) {
		return cachedData;
	}

	const [twitchEmotes, twitchBadges] = await Promise.all([
		tla.getChannelEmotes(channelId),
		tla.getChannelBadges(channelId)
	]);

	const result = {
		emotes: {
			twitch: twitchEmotes
		},
		badges: {
			twitch: twitchBadges
		}
	};

	channelCache.set(result);

	return result;
}

export async function getEmoteDetails(emoteId: string): Promise<any> {
	return tla.getEmoteDetails(emoteId);
}
