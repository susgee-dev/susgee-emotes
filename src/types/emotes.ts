import { TwitchBadges, TwitchEmotes, TwitchGlobalEmotes } from '@/types/api/tla';

export type ChannelData = {
	emotes: {
		twitch: TwitchEmotes | null;
	};
	badges: {
		twitch: TwitchBadges | null;
	};
};

export type GlobalData = {
	emotes: {
		twitch: TwitchGlobalEmotes | null;
	};
};
