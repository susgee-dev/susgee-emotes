import { CategorizedTwitchBadges, CategorizedTwitchEmotes } from '@/types/api/helix';
import { User } from '@/types/api/tla';

export type ChannelData = {
	channel: User;
	emotes: {
		twitch: CategorizedTwitchEmotes;
	};
	badges: {
		twitch: CategorizedTwitchBadges;
	};
};
