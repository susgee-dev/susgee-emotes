'use server';

import helix from '@/lib/api/helix';
import tla from '@/lib/api/tla';
import { getCache } from '@/lib/cache';
import { GlobalData } from '@/types/emotes';

const globalEmotesCache = getCache<GlobalData>('globalEmotes');

export async function fetchGlobalEmotes(): Promise<GlobalData> {
	const cachedData = globalEmotesCache.get();

	if (cachedData !== null) {
		return cachedData;
	}

	const [globalEmotes, hypeTrainEmotes] = await Promise.all([
		tla.getGlobalEmotes(),
		helix.getHypeTrainEmotes()
	]);

	if (globalEmotes) {
		globalEmotes.hypeTrain = hypeTrainEmotes || [];
	}

	const result = {
		emotes: {
			twitch: globalEmotes
		}
	};

	globalEmotesCache.set(result);

	return result;
}
