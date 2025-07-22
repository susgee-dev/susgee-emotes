import 'dotenv/config';

import BaseApi from './base';

import { EmoteResponse } from '@/types/api/helix';
import { Emote } from '@/types/api/tla';

class Helix extends BaseApi {
	private readonly headers = {
		'Client-ID': process.env.HELIX_CLIENT_ID || '',
		'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
	};

	constructor() {
		super('https://api.twitch.tv/helix/');
	}

	async fetch<T>(endpoint: string): Promise<T | null> {
		return super.fetch<T>(endpoint, {
			headers: this.headers
		});
	}

	async getHypeTrainEmotes(): Promise<Emote[] | null> {
		const response = await this.fetch<EmoteResponse>('chat/emotes?broadcaster_id=139075904');
		const emotes = response?.data || null;

		if (!emotes) return null;

		return emotes
			.filter((emote) => emote.emote_type === 'hypetrain')
			.map((emote) => ({
				id: emote.id,
				name: emote.name,
				image: `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/3.0`
			}));
	}
}

const helix = new Helix();

export default helix;
