import 'dotenv/config';

import BaseApi from './base';

import {
	CategorizedTwitchBadges,
	CategorizedTwitchEmotes,
	TwitchBadgesResponse,
	TwitchBadgeVersion,
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
				subscriber: {},
				bits: [],
				other: {}
			};
		}

		const categorized: CategorizedTwitchBadges = {
			subscriber: {},
			bits: [],
			other: {}
		};

		for (const badge of response.data) {
			for (const version of badge.versions) {
				const customVersion: TwitchBadgeVersion = {
					id: version.id,
					imageUrl: version.image_url_4x || version.image_url_2x || version.image_url_1x,
					title: version.title,
					description: version.description
				};

				if (badge.set_id === 'subscriber') {
					let duration = 'Subscriber';

					const titleMatch = version.title.match(
						/(\d+)[\s-]*(Month|Year|Day|Week|Hour|Minute|Second)s?/i
					);

					if (titleMatch) {
						const [, count, unit] = titleMatch;

						duration = `${count} ${unit}${parseInt(count) !== 1 ? 's' : ''}`;
					} else {
						const descMatch = version.description.match(
							/(\d+)[\s-]*(Month|Year|Day|Week|Hour|Minute|Second)s?/i
						);

						if (descMatch) {
							const [, count, unit] = descMatch;

							duration = `${count} ${unit}${parseInt(count) !== 1 ? 's' : ''}`;
						}
					}

					if (!categorized.subscriber[duration]) {
						categorized.subscriber[duration] = [];
					}

					categorized.subscriber[duration].push(customVersion);
				} else if (badge.set_id === 'bits') {
					categorized.bits.push(customVersion);
				} else {
					if (!categorized.other[badge.set_id]) {
						categorized.other[badge.set_id] = [];
					}
					categorized.other[badge.set_id].push(customVersion);
				}
			}
		}

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
