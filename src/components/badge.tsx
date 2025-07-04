import { Heading } from '@/components/ui/heading';
import { TwitchBadgeVersion } from '@/types/api/helix';
import { Tooltip } from '@heroui/tooltip';

import Image from 'next/image';

export default function Badge({ version }: { version: TwitchBadgeVersion }) {
	const description = version.description ? ` (${version.description})` : '';

	return (
		<Tooltip
			color="foreground"
			content={
				<Heading as="h4" variant="compact">
					{`${version.title}${description}`}
				</Heading>
			}
			placement="bottom"
		>
			<Image
				unoptimized
				alt={version.title}
				className="mx-0.5 inline-block align-sub"
				height={36}
				loading="lazy"
				src={version.image}
				title={version.title}
				width={36}
			/>
		</Tooltip>
	);
}
