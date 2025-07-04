import { CategorizedTwitchBadges } from '@/types/api/helix';
import { TwitchEmotes } from '@/types/api/tla';

export type ChannelData = {
	emotes: {
		twitch: TwitchEmotes | null;
	};
	badges: {
		twitch: CategorizedTwitchBadges;
	};
};
