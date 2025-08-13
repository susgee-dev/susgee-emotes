import 'dotenv/config';

import BaseApi from './base';

import logger from '@/lib/logger';
import { getBestName } from '@/lib/utils';
import { ApiBadge, ApiEmote, BadgeResponse, Emote, EmoteDetails, EmoteResponse, EmoteSet, GlobalEmoteResponse, Roles, TwitchBadges, TwitchEmotes, TwitchGlobalEmotes, User, UserResponse } from '@/types/api/tla';

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
        emoticonPrefix {
        	name
        }
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
			bestName: getBestName(user.login, user.displayName),
			description: user.description,
			color: user.chatColor,
			createdAt: user.createdAt,
			prefix: user.emoticonPrefix?.name || '',
			followers: user.followers?.totalCount || 0,
			avatar: user.profileImageURL,
			role: this.getRole(user.roles)
		};
	}

	async getGlobalEmotes(): Promise<TwitchGlobalEmotes | null> {
		const query = `query {
			global: emoteSet(id: "0") {
        emotes {
					id
					token
        }
      }
      turbo: emoteSet(id: "793") {
        emotes {
        	id
					token
        }
      }
      prime: emoteSet(id: "19194") {
      	emotes {
      		id
      		token
      	}
      }
    }`;

		const response = await this.fetch<GlobalEmoteResponse>(query);
		const emoteSets = response?.data || null;

		if (!emoteSets) return null;

		return {
			global: Array.from(
				new Map(
					emoteSets.global.emotes.map(this.normalizeEmote).map((emote) => [emote.name, emote])
				).values()
			),
			turbo: emoteSets.turbo.emotes.map(this.normalizeEmote),
			prime: emoteSets.prime.emotes.map(this.normalizeEmote),
			hypeTrain: []
		};
	}

	async getChannelEmotes(channelId: string): Promise<TwitchEmotes | null> {
		const query = `{
			user(id: "${channelId}") {
				cheer {
					badgeTierEmotes (filter: ALL) {
						id
						token
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
					}
				}
				channel {
					localEmoteSets {
						emotes {
							id
							token
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

	async getEmoteSet(setID: string): Promise<EmoteSet | null> {
		const query = `{
			emoteSet(id: "${setID}") {
				id
				owner {
					id
					login
					displayName
				}
				emotes {
					id
					token
					bitsBadgeTierSummary {
						threshold
					}
				}
			}
		}`;

		const response: any = await this.fetch(query);
		const set = response?.data?.emoteSet || null;

		if (!set) return null;

		let owner: User | null = null;

		if (set.owner) {
			owner = await this.getUser(set.owner.login);

			if (!owner) {
				owner = {
					id: set.owner.id,
					login: set.owner.login,
					displayName: set.owner.displayName,
					bestName: getBestName(set.owner.login, set.owner.displayName),
					description: '',
					color: '',
					createdAt: '',
					prefix: '',
					followers: 0,
					avatar: '',
					role: ''
				};
			}
		}

		const normalizedEmotes = set.emotes.map(this.normalizeEmote);
		const subtitle = this.determineEmoteSetSubtitle(set.id, normalizedEmotes, owner);

		return {
			id: set.id,
			owner,
			emotes: normalizedEmotes,
			subtitle
		};
	}

	async getEmoteDetails(emoteId: string): Promise<EmoteDetails | null> {
		const query = `{
			emote(id: "${emoteId}") {
				artist {
					login
					displayName
				}
				owner {
					id
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

		let owner = null;

		if (emote.owner) {
			owner = {
				id: emote.owner.id,
				login: emote.owner.login,
				displayName: emote.owner.displayName,
				bestName: getBestName(emote.owner.login, emote.owner.displayName)
			};
		}

		return {
			artist: emote.artist ? getBestName(emote.artist.login, emote.artist.displayName) : null,
			type,
			id: emote.id,
			token: emote.token,
			setID: emote.setID,
			state: emote.state,
			description,
			image: `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/3.0`,
			owner
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
			case 'ARCHIVE':
				return 'Archive';
			case 'BITS_BADGE_TIERS':
				return 'Bits';
			case 'FOLLOWER':
				return 'Follower';
			case 'GLOBALS':
				return 'Global';
			case 'HYPE_TRAIN':
				return 'Hype Train';
			case 'LIMITED_TIME':
				return 'Limited Time';
			case 'MEGA_COMMERCE':
				return 'Mega Commerce';
			case 'PRIME':
				return 'Prime';
			case 'SMILIES':
				return 'Smiley';
			case 'SUBSCRIPTIONS':
				return 'Subscription';
			case 'TURBO':
				return 'Turbo';
			case 'TWO_FACTOR':
				return 'Two Factor';
			default:
				logger.warn(`Unknown emote type: ${type}`);

				return 'Unknown';
		}
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

	private determineEmoteSetSubtitle(setId: string, emotes: Emote[], owner: User | null): string {
		if (setId === '0') return 'Global Emotes';
		if (setId === '793') return 'Turbo Emotes';
		if (setId === '19194') return 'Prime Emotes';

		const firstEmote = emotes[0];

		if (firstEmote?.description?.includes('Tier')) {
			const tierMatch = firstEmote.description.match(/Tier (\d)/);

			if (tierMatch) return `Tier ${tierMatch[1]} Subscription Emotes`;
		}

		if (firstEmote?.description?.includes('bits')) {
			return 'Bits Emotes';
		}

		if (!owner) return 'Global Emotes';

		return 'Follower Emotes';
	}
}

const tla = new Tla();

export default tla;
