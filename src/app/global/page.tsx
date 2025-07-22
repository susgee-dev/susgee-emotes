import { Metadata } from 'next';

import ClientPage from './client';

export const metadata: Metadata = {
	title: 'Twitch Global Emotes',
	description: 'View all global emotes available on Twitch'
};

export default async function GlobalEmotesPage() {
	return <ClientPage />;
}
