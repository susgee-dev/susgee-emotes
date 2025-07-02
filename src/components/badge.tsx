import Image from 'next/image';

import { TwitchBadgeVersion } from '@/types/api/helix';

export default function Badge({ version }: { version: TwitchBadgeVersion }) {
	return (
		<Image
			unoptimized
			alt={version.title}
			className="mx-0.5 inline-block align-sub"
			height={36}
			loading="lazy"
			src={version.imageUrl}
			title={`${version.title}`}
			width={36}
		/>
	);
}
