import Image from 'next/image';

import { Heading } from '@/components/ui/heading';

export default function NoEmotes() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 rounded-panel border border-line bg-surface-panel p-10 text-center">
			<Image
				alt="No Twitch emotes"
				className="h-40 w-40 object-contain"
				height={160}
				src="/sad.png"
				width={160}
			/>

			<div className="space-y-2">
				<Heading as="h2" variant="compact">
					No Twitch Emotes Available
				</Heading>

				<p className="max-w-lg text-ink-muted">
					This channel is not a Twitch Affiliate or Partner, so it does not have Twitch subscriber
					or follower emotes.
				</p>
			</div>
		</div>
	);
}
