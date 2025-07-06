export type Roles = {
	isPartner: boolean;
	isAffiliate: boolean;
};

export type UserResponse = {
	data: {
		user: {
			id: string;
			login: string;
			displayName: string;
			description: string;
			chatColor: string;
			createdAt: string;
			profileImageURL: string;
			roles: Roles;
			followers: {
				totalCount: number;
			};
		};
	};
};

export type User = {
	id: string;
	login: string;
	displayName: string;
	description: string;
	color: string;
	createdAt: string;
	followers: number;
	avatar: string;
	role: string;
};

export type ApiEmote = {
	assetType: string;
	token: string;
	id: string;
	bitsBadgeTierSummary?: {
		threshold: number;
	};
};

export type Emote = {
	id: string;
	name: string;
	description?: string;
	image: string;
};

export type EmoteResponse = {
	data: {
		user: {
			subscriptionProducts: {
				tier: string;
				emotes: ApiEmote[];
			}[];
			cheer: {
				badgeTierEmotes: ApiEmote[];
			};
			channel: {
				localEmoteSets: {
					emotes: ApiEmote[];
				}[];
			};
		};
	};
};

export type TwitchEmotes = {
	follower: Emote[];
	tier1: Emote[];
	tier2: Emote[];
	tier3: Emote[];
	bits: Emote[];
};

export type Badge = {
	id: number;
	title: string;
	description?: string;
	image: string;
};

export type TwitchBadges = {
	subscriber: Badge[];
	bits: Badge[];
};
