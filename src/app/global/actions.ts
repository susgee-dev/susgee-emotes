'use server';

import helix from '@/lib/api/helix';
import tla from '@/lib/api/tla';
import { GlobalData } from '@/types/emotes';

export async function fetchGlobalEmotes(): Promise<GlobalData> {
	const [globalEmotes, hypeTrainEmotes] = await Promise.all([
		tla.getGlobalEmotes(),
		helix.getHypeTrainEmotes()
	]);

	if (globalEmotes) {
		globalEmotes.hypeTrain = hypeTrainEmotes || [];
	}

	return {
		emotes: {
			twitch: globalEmotes
		}
	};
}
