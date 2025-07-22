'use client';

import Emote from '@/components/emote';
import { Heading } from '@/components/ui/heading';
import { Emote as TwitchEmote } from '@/types/api/tla';

type EmoteSectionProps = {
	title: string;
	emotes: TwitchEmote[];
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	searchQuery?: string;
	initialEmoteId: string | null;
};

export default function EmoteSection({
	title,
	emotes,
	as = 'h3',
	searchQuery = '',
	initialEmoteId = null
}: EmoteSectionProps) {
	if (!emotes.length) return null;

	return (
		<div className="flex flex-col gap-4">
			<Heading as={as} variant="compact">
				{title}
			</Heading>
			<div className="flex flex-wrap items-baseline gap-2">
				{emotes.map((emote) => (
					<Emote
						key={emote.id}
						emote={emote}
						initiallyOpen={initialEmoteId === emote.id}
						searchQuery={searchQuery}
					/>
				))}
			</div>
		</div>
	);
}
