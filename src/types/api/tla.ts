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
};

export type Emote = {
	id: string;
	name: string;
	image: string;
};

export type EmoteResponse = {
	data: {
		user: {
			subscriptionProducts: {
				emoteSetID: string;
				displayName: string;
				tier: string;
				emotes: ApiEmote[];
			}[];
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
};
