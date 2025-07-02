export type UserResponse = {
	data: User[];
};

export type User = {
	id: string;
	login: string;
	display_name: string;
};

export type TwitchBadgeVersionResponse = {
	id: string;
	image_url_1x: string;
	image_url_2x: string;
	image_url_4x: string;
	title: string;
	description: string;
	click_action?: string;
	click_url?: string | null;
};

export type TwitchBadgeResponse = {
	set_id: string;
	versions: TwitchBadgeVersionResponse[];
};

export type TwitchBadgesResponse = {
	data: TwitchBadgeResponse[];
};

export type TwitchBadgeVersion = {
	id: string;
	imageUrl: string;
	title: string;
	description: string;
};

export type CategorizedTwitchBadges = {
	subscriber: {
		[duration: string]: TwitchBadgeVersion[];
	};
	bits: TwitchBadgeVersion[];
	other: {
		[key: string]: TwitchBadgeVersion[];
	};
};

export type TwitchEmote = {
	id: string;
	name: string;
	images: {
		oneX: string;
		twoX: string;
		fourX: string;
	};
	tier: string;
	type: string;
	emoteSetId: string;
};

export type CategorizedTwitchEmotes = {
	follower: TwitchEmote[];
	tier1: TwitchEmote[];
	tier2: TwitchEmote[];
	tier3: TwitchEmote[];
	bits: TwitchEmote[];
	other: TwitchEmote[];
};

export type TwitchEmoteResponse = {
	data: {
		id: string;
		name: string;
		images: {
			url_1x: string;
			url_2x: string;
			url_4x: string;
		};
		tier: string;
		emote_type: string;
		emote_set_id: string;
	}[];
};
