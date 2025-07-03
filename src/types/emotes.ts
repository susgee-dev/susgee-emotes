import { CategorizedTwitchBadges, CategorizedTwitchEmotes } from '@/types/api/helix';

export type ChannelData = {
	emotes: {
		twitch: CategorizedTwitchEmotes;
	};
	badges: {
		twitch: CategorizedTwitchBadges;
	};
};
