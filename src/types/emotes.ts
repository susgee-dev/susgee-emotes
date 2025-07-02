import { CategorizedTwitchBadges, CategorizedTwitchEmotes } from '@/types/api/helix';

export type EmoteData = {
	emotes: {
		twitch: CategorizedTwitchEmotes;
	};
	badges: {
		twitch: CategorizedTwitchBadges;
	};
};
