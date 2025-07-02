'use client';

import Emote from '@/components/emote';
import { Heading } from '@/components/ui/heading';
import { TwitchEmote } from '@/types/api/helix';

type EmoteSectionProps = {
	title: string;
	emotes: TwitchEmote[];
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export default function EmoteSection({ title, emotes, as = 'h3' }: EmoteSectionProps) {
	if (!emotes.length) return null;

	return (
		<div className="flex flex-col gap-1">
			<Heading as={as} variant="compact">
				{title}
			</Heading>
			<div className="">
				{emotes.map((emote) => (
					<Emote key={emote.id} emote={emote} />
				))}
			</div>
		</div>
	);
}
