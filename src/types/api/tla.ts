export type UserResponse = {
	data: {
		user: User;
	};
};

export type User = {
	id: string;
	login: string;
	displayName: string;
	description: string;
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
