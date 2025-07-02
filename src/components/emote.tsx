import Image from 'next/image';

import { TwitchEmote } from '@/types/api/helix';

export default function Emote({ emote }: { emote: TwitchEmote }) {
	return (
		<Image
			unoptimized
			alt={emote.name}
			className="mx-0.5 inline-block align-sub"
			height={56}
			loading="lazy"
			src={emote.images.fourX ?? emote.images.twoX ?? emote.images.oneX}
			title={emote.name}
			width={56}
		/>
	);
}
