import 'dotenv/config';

import BaseApi from './base';

import {
	ApiEmote,
	Emote,
	EmoteResponse,
	Roles,
	TwitchEmotes,
	User,
	UserResponse
} from '@/types/api/tla';

class Tla extends BaseApi {
	private readonly headers = {
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
			headers: {
				'Content-Type': 'application/json',
				...this.headers
			},
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

		const normalize = (e: ApiEmote): Emote => ({
			id: e.id,
			name: e.token,
			image: `https://static-cdn.jtvnw.net/emoticons/v2/${e.id}/default/dark/3.0`
		});

		const tiers: Record<string, keyof TwitchEmotes> = {
			1000: 'tier1',
			2000: 'tier2',
			3000: 'tier3'
		};

		const emotes: TwitchEmotes = {
			tier1: [],
			tier2: [],
			tier3: [],
			follower: []
		};

		for (const sub of subEmotes) {
			const key = tiers[sub.tier];

			emotes[key].push(...sub.emotes.map(normalize));
		}

		emotes.follower = followerEmotes?.flatMap((set) => set.emotes.map(normalize)) ?? [];

		return emotes;
	}

	async getChannelBadges(channelId: string): Promise<any> {
		const query = `{
			user(id: "${channelId}") {
				cheer {
					badgeTierEmotes (filter: ALL) {
						token
						bitsBadgeTierSummary {
							threshold
						}
					}
				}
				broadcastBadges {
					id
					setID
					version
					title
					imageURL(size:DOUBLE)
				}
			}
		}`;

		const response = await this.fetch<any>(query);
		const user = response?.data?.user || null;

		if (!user) {
			return null;
		}

		const badges = {
			subscriber: [] as any,
			bits: [] as any
		};

		user?.broadcastBadges?.map((badge: any) => {
			if (badge.setID === 'bits') {
				return badges.bits.push({
					id: Number(badge.version),
					title: badge.title,
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
					tier: tier,
					title: badge.title,
					image: badge.imageURL
				});
			}
		});

		badges.subscriber.sort((a: any, b: any) => a.id - b.id);
		badges.bits.sort((a: any, b: any) => a.id - b.id);

		return badges;
	}

	private getRole(roles: Roles): string {
		if (roles.isPartner) return 'Partner';
		if (roles.isAffiliate) return 'Affiliate';

		return '';
	}
}

const tla = new Tla();

export default tla;
