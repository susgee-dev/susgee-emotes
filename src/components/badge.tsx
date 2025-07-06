import { Tooltip } from '@heroui/tooltip';
import Image from 'next/image';

import { Heading } from '@/components/ui/heading';
import { Badge as TwitchBadge } from '@/types/api/tla';

export default function Badge({ badge }: { badge: TwitchBadge }) {
	const description = badge.description ? ` (${badge.description})` : '';

	return (
		<Tooltip
			color="foreground"
			content={
				<Heading as="h4" variant="compact">
					{badge.title}
					{description}
				</Heading>
			}
			placement="bottom"
		>
			<Image
				unoptimized
				alt={badge.title}
				className="mx-0.5 inline-block align-sub"
				height={36}
				loading="lazy"
				src={badge.image}
				title={badge.title}
				width={36}
			/>
		</Tooltip>
	);
}
