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
			roles: {
				isAffiliate: boolean;
				isPartner: boolean;
			};
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
	isAffiliate: boolean;
	isPartner: boolean;
};
