import { TwitchBadges, TwitchEmotes } from '@/types/api/tla';

export type ChannelData = {
	emotes: {
		twitch: TwitchEmotes | null;
	};
	badges: {
		twitch: TwitchBadges | null;
	};
};
