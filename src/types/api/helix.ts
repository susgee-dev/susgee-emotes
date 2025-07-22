export type EmoteResponse = {
	data: HelixEmote[];
};

export type HelixEmote = {
	id: string;
	name: string;
	emote_type: string;
};
