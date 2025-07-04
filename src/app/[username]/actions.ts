'use server';

import helix from '@/lib/api/helix';
import tla from '@/lib/api/tla';
import logger from '@/lib/logger';
import { ChannelData } from '@/types/emotes';

export async function fetchChannelData(channelId: string): Promise<ChannelData> {
	const [twitchEmotes, twitchBadges, tlaBadges] = await Promise.all([
		tla.getChannelEmotes(channelId),
		helix.getChannelBadges(channelId),
		tla.getChannelBadges(channelId)
	]);

	logger.info(tlaBadges);

	return {
		emotes: {
			twitch: twitchEmotes
		},
		badges: {
			twitch: twitchBadges
		}
	};
}
