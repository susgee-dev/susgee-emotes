'use client';

import Emote from '@/components/emote';
import { Heading } from '@/components/ui/heading';
import { Emote as TwitchEmote } from '@/types/api/tla';

type EmoteSectionProps = {
	title: string;
	emotes: TwitchEmote[];
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	searchQuery?: string;
};

export default function EmoteSection({
	title,
	emotes,
	as = 'h3',
	searchQuery = ''
}: EmoteSectionProps) {
	if (!emotes.length) return null;

	return (
		<div className="flex flex-col gap-4">
			<Heading as={as} variant="compact">
				{title}
			</Heading>
			<div className="flex flex-wrap gap-1">
				{emotes.map((emote) => (
					<Emote key={emote.id} emote={emote} searchQuery={searchQuery} />
				))}
			</div>
		</div>
	);
}
