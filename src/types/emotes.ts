import { CategorizedTwitchEmotes, CategorizedTwitchBadges } from '@/types/api/helix';

export type EmoteData = {
	emotes: {
		twitch: CategorizedTwitchEmotes;
	};
	badges: {
		twitch: CategorizedTwitchBadges;
	};
};
