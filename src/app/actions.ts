'use server';

import helix from '@/lib/api/helix';
import tla from '@/lib/api/tla';
import { getCache } from '@/lib/cache';
import { EmoteDetails, EmoteSet, User } from '@/types/api/tla';
import { ChannelData, GlobalData } from '@/types/emotes';

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

export async function fetchChannelData(channelId: string): Promise<ChannelData> {
	const channelCache = getCache<ChannelData>(`channel:${channelId}`);

	const cachedData = channelCache.get();

	if (cachedData !== null) {
		return cachedData;
	}

	const [twitchEmotes, twitchBadges] = await Promise.all([
		tla.getChannelEmotes(channelId),
		tla.getChannelBadges(channelId)
	]);

	const result = {
		emotes: {
			twitch: twitchEmotes
		},
		badges: {
			twitch: twitchBadges
		}
	};

	channelCache.set(result);

	return result;
}

export async function getEmoteDetails(emoteId: string): Promise<EmoteDetails | null> {
	const emoteCache = getCache<EmoteDetails>(`emote:${emoteId}`);

	const cachedData = emoteCache.get();

	if (cachedData !== null) {
		return cachedData;
	}

	const emoteDetails = await tla.getEmoteDetails(emoteId);

	if (emoteDetails) {
		emoteCache.set(emoteDetails);
	}

	return emoteDetails;
}

export async function getEmoteSetDetails(setId: string): Promise<EmoteSet | null> {
	const setCache = getCache<EmoteSet>(`emoteSet:${setId}`);

	const cachedData = setCache.get();

	if (cachedData !== null) {
		return cachedData;
	}

	const setDetails = await tla.getEmoteSet(setId);

	if (setDetails) {
		setCache.set(setDetails);
	}

	return setDetails;
}

export async function getUserData(username: string): Promise<User | null> {
	const userCache = getCache<User>(`user:${username}`);

	const cachedData = userCache.get();

	if (cachedData !== null) {
		return cachedData;
	}

	const userData = await tla.getUser(username);

	if (userData) {
		userCache.set(userData);
	}

	return userData;
}
