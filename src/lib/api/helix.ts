import 'dotenv/config';

import BaseApi from './base';

import {
	CategorizedTwitchBadges,
	CategorizedTwitchEmotes,
	TwitchBadgesResponse,
	TwitchEmote,
	TwitchEmoteResponse
} from '@/types/api/helix';

class Helix extends BaseApi {
	private readonly headers = {
		'Client-ID': process.env.HELIX_CLIENT_ID || '',
		'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
	};

	constructor() {
		super('https://api.twitch.tv/helix');
	}

	async getChannelBadges(channelId: string): Promise<CategorizedTwitchBadges> {
		const response = await super.fetch<TwitchBadgesResponse>(
			`/chat/badges?broadcaster_id=${channelId}`,
			{
				headers: this.headers
			}
		);

		if (!response?.data) {
			return {
				subscriber: [],
				bits: []
			};
		}

		const categorized: CategorizedTwitchBadges = {
			subscriber: [],
			bits: []
		};

		for (const badge of response.data) {
			for (const version of badge.versions) {
				if (badge.set_id === 'subscriber') {
					const rawId = Number(version.id);
					let tier = 1;
					let months = rawId;

					if (rawId >= 3000) {
						tier = 3;
						months = rawId - 3000;
					} else if (rawId >= 2000) {
						tier = 2;
						months = rawId - 2000;
					}

					const id = months * 10 + tier;

					categorized.subscriber.push({
						id,
						title: version.title,
						image: version.image_url_4x || version.image_url_2x || version.image_url_1x,
						description: tier === 1 ? '' : `Tier ${tier}`
					});
				}

				if (badge.set_id === 'bits') {
					categorized.bits.push({
						id: Number(version.id),
						title: version.title,
						image: version.image_url_4x || version.image_url_2x || version.image_url_1x
					});
				}
			}
		}

		categorized.subscriber.sort((a, b) => a.id - b.id);

		return categorized;
	}

	async getChannelEmotes(channelId: string): Promise<CategorizedTwitchEmotes> {
		const response = await super.fetch<TwitchEmoteResponse>(
			`/chat/emotes?broadcaster_id=${channelId}`,
			{
				headers: this.headers
			}
		);

		const categorized: CategorizedTwitchEmotes = {
			follower: [],
			tier1: [],
			tier2: [],
			tier3: [],
			bits: [],
			other: []
		};

		for (const emote of response?.data || []) {
			const twitchEmote: TwitchEmote = {
				id: emote.id,
				name: emote.name,
				tier: emote.tier || '',
				type: emote.emote_type,
				emoteSetId: emote.emote_set_id,
				images: {
					oneX: emote.images.url_1x.replace('/static/', '/default/'),
					twoX: emote.images.url_2x.replace('/static/', '/default/'),
					fourX: emote.images.url_4x.replace('/static/', '/default/')
				}
			};

			switch (emote.emote_type) {
				case 'follower':
					categorized.follower.push(twitchEmote);
					break;
				case 'subscriptions':
					const tierMap: Record<string, TwitchEmote[]> = {
						'1000': categorized.tier1,
						'2000': categorized.tier2,
						'3000': categorized.tier3
					};

					(tierMap[emote.tier] || categorized.other).push(twitchEmote);
					break;
				case 'bitstier':
					categorized.bits.push(twitchEmote);
					break;
				default:
					categorized.other.push(twitchEmote);
			}
		}

		return categorized;
	}
}

const helix = new Helix();

export default helix;
