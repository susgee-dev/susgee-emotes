import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ClientPage from './client';

import { getEmoteDetails, getEmoteSetDetails } from '@/app/actions';

type PageParams = {
	params: Promise<{ emoteId: string }>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	const { emoteId } = await params;

	if (!emoteId) {
		return {
			title: 'Invalid Emote',
			description: 'Please enter a valid emote ID'
		};
	}

	try {
		const emoteDetails = await getEmoteDetails(emoteId);

		if (emoteDetails) {
			const title = `Emote: ${emoteDetails.token}`;
			const description = emoteDetails.description;

			return {
				title,
				description,
				openGraph: {
					title,
					description,
					images: [
						{
							url: emoteDetails.image,
							width: 112,
							height: 112,
							alt: `${emoteDetails.token} emote`
						}
					]
				},
				twitter: {
					card: 'summary_large_image',
					title,
					description,
					images: [emoteDetails.image]
				}
			};
		}
	} catch {}

	return {
		title: `Emote: ${emoteId}`,
		description: `View details for emote ${emoteId}`
	};
}

export default async function EmotePage({ params }: PageParams) {
	const { emoteId } = await params;

	if (!emoteId) {
		notFound();
	}

	const emoteDetails = await getEmoteDetails(emoteId);

	if (!emoteDetails) {
		notFound();
	}

	let setEmotes = null;

	if (emoteDetails.setID) {
		const emoteSet = await getEmoteSetDetails(emoteDetails.setID);

		if (emoteSet) {
			setEmotes = emoteSet.emotes;
		}
	}

	return <ClientPage emote={emoteDetails} setEmotes={setEmotes} />;
}
