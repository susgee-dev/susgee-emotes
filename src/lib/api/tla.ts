import 'dotenv/config';

import BaseApi from './base';

import { User, UserResponse } from '@/types/api/tla';

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

	async getUser(username: string): Promise<null | User> {
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

	private getRole(roles: { isPartner: boolean; isAffiliate: boolean }): string {
		if (roles.isPartner) return 'Partner';
		if (roles.isAffiliate) return 'Affiliate';

		return '';
	}
}

const tla = new Tla();

export default tla;
