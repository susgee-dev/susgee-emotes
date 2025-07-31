'use client';

import Image from 'next/image';
import { useState } from 'react';

import EmoteSection from '@/components/emote-section';
import { IconExternal } from '@/components/icons/external';
import { Heading } from '@/components/ui/heading';
import { Link } from '@/components/ui/link';
import { getEmoteDimensions } from '@/lib/utils';

type EmoteClientProps = {
	emote: {
		id: string;
		token: string;
		description: string;
		image: string;
		type: string;
		setID: string;
		artist: string | null;
		owner: {
			id: string;
			login: string;
			displayName: string;
			bestName: string;
		} | null;
	};
	setEmotes:
		| {
				id: string;
				name: string;
				image: string;
				description?: string;
		  }[]
		| null;
};

export default function EmoteClient({ emote, setEmotes }: EmoteClientProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const emoteDimensions = getEmoteDimensions(emote.id, 112);

	const otherEmotes = setEmotes?.filter((e) => e.id !== emote.id) || [];

	return (
		<>
			<div className="flex flex-col gap-6">
				<Link href="/">← back to search</Link>

				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-start gap-6 md:flex-row">
						<Image
							unoptimized
							alt={emote.token}
							height={emoteDimensions.height}
							src={emote.image}
							style={{ objectFit: 'contain' }}
							width={emoteDimensions.width}
						/>
						<div className="flex flex-col gap-2">
							<Heading as="h1" variant="compact">
								{emote.token}
							</Heading>
							<p className="break-word text-sm text-gray-400">
								<span className="font-medium">ID:</span> {emote.id}
							</p>

							{emote.description && <p className="text-lg font-medium">{emote.description}</p>}
							{emote.artist && (
								<p className="text-lg">
									<span className="font-medium">Artist:</span>{' '}
									<Link href={`/${emote.artist}`} size="lg">
										{emote.artist}
									</Link>
									{' | '}
									<Link
										align="top"
										href={`https://twitch.tv/${emote.artist}`}
										iconAfter={<IconExternal size={14} />}
										size="lg"
										target="_blank"
									>
										Twitch
									</Link>
								</p>
							)}
							{emote.owner && (
								<p className="text-lg">
									<span className="font-medium">Owner:</span>{' '}
									<Link href={`/${emote.owner.login}`} size="lg">
										{emote.owner.bestName}
									</Link>
									{' | '}
									<Link
										align="top"
										href={`https://twitch.tv/${emote.owner.login}`}
										iconAfter={<IconExternal size={14} />}
										size="lg"
										target="_blank"
									>
										Twitch
									</Link>
								</p>
							)}
							{emote.setID && (
								<p className="break-word text-sm text-gray-400">
									<span className="font-medium">Emote Set:</span>{' '}
									<Link href={`/set/${emote.setID}`} size="sm">
										{emote.setID}
									</Link>
								</p>
							)}
						</div>
					</div>
					{otherEmotes.length > 0 && (
						<div className="flex flex-col gap-4">
							<EmoteSection
								emotes={otherEmotes}
								initialEmoteId={null}
								searchQuery={searchQuery}
								title="Other Emotes in this Set"
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
