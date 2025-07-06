'use client';

import { Tooltip } from '@heroui/tooltip';
import Image from 'next/image';

import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import { Emote as TwitchEmote } from '@/types/api/tla';

export default function Emote({
	emote,
	searchQuery = ''
}: {
	emote: TwitchEmote;
	searchQuery?: string;
}) {
	const isMatch = !searchQuery || emote.name.toLowerCase().includes(searchQuery.toLowerCase());

	return (
		<Tooltip
			color="foreground"
			content={
				<>
					<Heading as="h3" variant="compact">
						{emote.name}
					</Heading>
					{emote.description && (
						<Heading as="h4" variant="compact">
							{emote.description}
						</Heading>
					)}
				</>
			}
			placement="bottom"
		>
			<Image
				unoptimized
				alt={emote.name}
				className={cn('duration-300', !isMatch && 'opacity-20')}
				height={56}
				loading="lazy"
				src={emote.image}
				title={emote.name}
				width={56}
			/>
		</Tooltip>
	);
}
