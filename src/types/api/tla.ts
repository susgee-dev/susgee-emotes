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
			emoticonPrefix: {
				name: string;
			};
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
	bestName: string;
	description: string;
	color: string;
	createdAt: string;
	prefix: string;
	followers: number;
	avatar: string;
	role: string;
};

export type ApiEmote = {
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

export type GlobalEmoteResponse = {
	data: {
		global: {
			emotes: ApiEmote[];
		};
		turbo: {
			emotes: ApiEmote[];
		};
		prime: {
			emotes: ApiEmote[];
		};
	};
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

export type TwitchGlobalEmotes = {
	global: Emote[];
	turbo: Emote[];
	prime: Emote[];
	hypeTrain: Emote[];
};

export type ApiBadge = {
	id: string;
	setID: string;
	version: string;
	title: string;
	imageURL: string;
};

export type BadgeResponse = {
	data: {
		user: {
			broadcastBadges: ApiBadge[];
		};
	};
};

export type Badge = {
	id: number;
	name: string;
	description?: string;
	image: string;
};

export type TwitchBadges = {
	subscriber: Badge[];
	bits: Badge[];
};

export type EmoteOwner = {
	id: string;
	login: string;
	displayName: string;
	bestName: string;
};

export type EmoteDetails = {
	id: string;
	token: string;
	description: string;
	image: string;
	type: string;
	setID: string;
	state: string;
	artist: string | null;
	owner: EmoteOwner | null;
};

export type EmoteSet = {
	id: string;
	owner: User | null;
	emotes: Emote[];
	subtitle: string;
};
