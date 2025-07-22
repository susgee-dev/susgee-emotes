'use server';

import tla from '@/lib/api/tla';
import { GlobalData } from '@/types/emotes';

export async function fetchGlobalEmotes(): Promise<GlobalData> {
	const twitchGlobalEmotes = await tla.getGlobalEmotes();

	return {
		emotes: {
			twitch: twitchGlobalEmotes
		}
	};
}
