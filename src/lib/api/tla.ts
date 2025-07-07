import 'dotenv/config';

import BaseApi from './base';

import { getBestName } from '@/lib/utils';
import {
	ApiBadge,
	ApiEmote,
	BadgeResponse,
	Emote,
	EmoteResponse,
	Roles,
	TwitchBadges,
	TwitchEmotes,
	User,
	UserResponse
} from '@/types/api/tla';

class Tla extends BaseApi {
	private readonly headers = {
		Authorization: `OAuth ${process.env.TLA_AUTH_TOKEN || ''}`,
		'Client-ID': process.env.TLA_CLIENT_ID || '',
		'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
	};

	constructor() {
		super('https://gql.twitch.tv/gql');
	}

	async fetch<T>(query: string): Promise<T | null> {
		return super.fetch<T>('', {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({ query })
		});
	}

	async getUser(username: string): Promise<User | null> {
		const query = `{
			user (login: "${username}", lookupType: ALL) {
        id
        login 
        displayName
        description
        chatColor
        createdAt
        profileImageURL (width: 600)
        roles {
          isAffiliate
          isPartner
        }
        followers {
          totalCount
        }
      }
		}`;

		const response = await this.fetch<UserResponse>(query);
		const user = response?.data?.user || null;

		if (!user) return null;

		return {
			id: user.id,
			login: user.login,
			displayName: user.displayName,
			description: user.description,
			color: user.chatColor,
			createdAt: user.createdAt,
			followers: user.followers?.totalCount || 0,
			avatar: user.profileImageURL,
			role: this.getRole(user.roles)
		};
	}

	async getChannelEmotes(channelId: string): Promise<TwitchEmotes | null> {
		const query = `{
			user(id: "${channelId}") {
				cheer {
					badgeTierEmotes (filter: ALL) {
						id
						token
						assetType
						bitsBadgeTierSummary {
							threshold
						}
					}
				}
				subscriptionProducts {
					tier
					emotes {
						id
						token
						assetType
					}
				}
				channel {
					localEmoteSets {
						emotes {
							id
							token
							assetType
						}
					}
				}
			}
		}`;

		const response = await this.fetch<EmoteResponse>(query);
		const user = response?.data?.user || null;

		if (!user) {
			return null;
		}

		const subEmotes = user?.subscriptionProducts ?? [];
		const followerEmotes = user?.channel?.localEmoteSets ?? [];
		const bitsEmotes = user?.cheer?.badgeTierEmotes ?? [];

		const tiers: Record<string, keyof TwitchEmotes> = {
			1000: 'tier1',
			2000: 'tier2',
			3000: 'tier3'
		};

		const emotes: TwitchEmotes = {
			follower: [],
			tier1: [],
			tier2: [],
			tier3: [],
			bits: []
		};

		for (const sub of subEmotes) {
			const key = tiers[sub.tier];

			emotes[key].push(...sub.emotes.map(this.normalizeEmote));
		}

		emotes.bits = bitsEmotes.map(this.normalizeEmote) ?? [];
		emotes.follower = followerEmotes?.flatMap((set) => set.emotes.map(this.normalizeEmote)) ?? [];

		return emotes;
	}

	async getChannelBadges(channelId: string): Promise<TwitchBadges | null> {
		const query = `{
			user(id: "${channelId}") {
				broadcastBadges {
					id
					setID
					version
					title
					imageURL(size:DOUBLE)
				}
			}
		}`;

		const response = await this.fetch<BadgeResponse>(query);
		const user = response?.data?.user || null;

		if (!user) {
			return null;
		}

		const badges: TwitchBadges = {
			subscriber: [],
			bits: []
		};

		user?.broadcastBadges?.map((badge: ApiBadge) => {
			if (badge.setID === 'bits') {
				return badges.bits.push({
					id: Number(badge.version),
					name: badge.title,
					image: badge.imageURL
				});
			}

			if (badge.setID === 'subscriber') {
				const version = Number(badge.version);
				let tier = 1;
				let months = version;

				if (version >= 3000) {
					tier = 3;
					months = version - 3000;
				} else if (version >= 2000) {
					tier = 2;
					months = version - 2000;
				}

				return badges.subscriber.push({
					id: months * 10 + tier,
					name: badge.title,
					image: badge.imageURL,
					description: `tier ${tier}`
				});
			}
		});

		badges.subscriber.sort((a, b) => a.id - b.id);
		badges.bits.sort((a, b) => a.id - b.id);

		return badges;
	}

	async getEmoteDetails(emoteId: string): Promise<any> {
		const query = `{
			emote(id: "${emoteId}") {
				artist {
					login
					displayName
				}
				type
				id
				token
				setID
				state
				subscriptionTier
				bitsBadgeTierSummary {
					threshold
				}
			}
		}`;

		const response: any = await this.fetch(query);
		const emote = response?.data?.emote || null;

		if (!emote) return null;

		const type = this.getEmoteType(emote.type);
		const tier = emote.subscriptionTier?.replace('TIER_', '') || null;
		const bits = emote.bitsBadgeTierSummary?.threshold || null;

		const formattedType = this.formatEmoteDescription(type, tier, bits);
		const description = formattedType ? `${formattedType} emote` : '';

		return {
			artist: emote.artist ? getBestName(emote.artist.login, emote.artist.displayName) : null,
			type,
			id: emote.id,
			token: emote.token,
			setID: emote.setID,
			state: emote.state,
			description,
			image: `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/3.0`
		};
	}

	private normalizeEmote(e: ApiEmote): Emote {
		const emote: Emote = {
			id: e.id,
			name: e.token,
			image: `https://static-cdn.jtvnw.net/emoticons/v2/${e.id}/default/dark/3.0`
		};

		if (e.bitsBadgeTierSummary?.threshold) {
			emote.description = `cost: ${e.bitsBadgeTierSummary.threshold} bits`;
		}

		return emote;
	}

	private getEmoteType(type: string): string {
		switch (type) {
			case 'BITS_BADGE_TIERS':
				return 'Bits';
			case 'SUBSCRIPTIONS':
				return 'Subscription';
			case 'ARCHIVE':
				return 'Archive';
		}

		return 'Follower';
	}

	private formatEmoteDescription(
		type: string,
		tier: string | null = null,
		bits: number | null = null
	): string {
		if (type === 'Subscription' && tier) {
			return `Subscription Tier ${tier}`;
		} else if (type === 'Bits' && bits) {
			return `Bits ${bits}`;
		} else {
			return type;
		}
	}

	private getRole(roles: Roles): string {
		if (roles.isPartner) return 'Partner';
		if (roles.isAffiliate) return 'Affiliate';

		return '';
	}
}

const tla = new Tla();

export default tla;
