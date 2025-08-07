'use client';

import Image from 'next/image';

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
	const otherEmotes = setEmotes?.filter((e) => e.id !== emote.id) || [];

	return (
		<>
			<div className="flex flex-col gap-6">
				<Link href="/">← back to search</Link>

				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-start gap-6">
						<Heading as="h1" variant="compact">
							{emote.token}
						</Heading>
						<div className="flex flex-col gap-4 md:flex-row">
							<Image
								unoptimized
								alt={emote.token}
								height={getEmoteDimensions(emote.id, 112).height}
								src={emote.image}
								style={{ objectFit: 'contain' }}
								width={getEmoteDimensions(emote.id, 112).width}
							/>
							<div className="flex flex-col gap-2">
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
											{emote.owner.bestName || emote.owner.displayName || emote.owner.login}
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
									<p className="break-word text-lg">
										<span className="font-medium">Emote Set:</span>{' '}
										<Link href={`/set/${emote.setID}`}>{emote.setID}</Link>
									</p>
								)}

								<p className="break-word text-sm text-muted-foreground">
									<span className="font-medium">ID:</span> {emote.id}
								</p>
							</div>
						</div>
					</div>
					{otherEmotes.length > 0 && (
						<div className="flex flex-col gap-4">
							<EmoteSection
								emotes={otherEmotes}
								initialEmoteId={null}
								title="Other Emotes in this Set"
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
