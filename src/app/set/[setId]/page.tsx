import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ClientPage from './client';

import { getEmoteSetDetails } from '@/app/actions';

type PageParams = {
	params: Promise<{ setId: string }>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	const { setId } = await params;

	if (!setId) {
		return {
			title: 'Invalid Emote Set',
			description: 'Please enter a valid emote set ID'
		};
	}

	try {
		const emoteSet = await getEmoteSetDetails(setId);

		if (emoteSet) {
			const title = `Emote Set: ${setId}`;
			const description = emoteSet.owner
				? `Explore all emotes in set ${setId} owned by ${emoteSet.owner.bestName}`
				: `Explore all emotes in set ${setId}`;

			return {
				title,
				description,
				openGraph: {
					title,
					description
				},
				twitter: {
					card: 'summary_large_image',
					title,
					description
				}
			};
		}
	} catch {}

	return {
		title: `Emote Set: ${setId}`,
		description: `Browse through emotes in set ${setId}`
	};
}

export default async function EmoteSetPage({ params }: PageParams) {
	const { setId } = await params;

	if (!setId) {
		notFound();
	}

	const emoteSet = await getEmoteSetDetails(setId);

	if (!emoteSet) {
		notFound();
	}

	return <ClientPage emoteSet={emoteSet} />;
}
