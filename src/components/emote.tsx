'use client';

import { Tooltip } from '@heroui/tooltip';
import Image from 'next/image';

import { Heading } from '@/components/ui/heading';
import { TwitchEmote } from '@/types/api/helix';

export default function Emote({ emote }: { emote: TwitchEmote }) {
	return (
		<div className="emote">
			<Tooltip
				color="foreground"
				content={
					<Heading as="h3" variant="compact">
						{emote.name}
					</Heading>
				}
				placement="bottom"
			>
				<Image
					unoptimized
					alt={emote.name}
					height={56}
					loading="lazy"
					src={emote.images.fourX ?? emote.images.twoX ?? emote.images.oneX}
					title={emote.name}
					width={56}
				/>
			</Tooltip>
		</div>
	);
}
