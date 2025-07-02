'use client';

import EmoteSection from '@/components/emote-section';
import { Heading } from '@/components/ui/heading';
import { TwitchEmote } from '@/types/api/helix';

type SubscriptionEmotesProps = {
	subs: {
		tier1: TwitchEmote[];
		tier2: TwitchEmote[];
		tier3: TwitchEmote[];
	};
};

export default function SubEmotes({ subs }: SubscriptionEmotesProps) {
	const { tier1, tier2, tier3 } = subs;

	if (!tier1.length && !tier2.length && !tier3.length) return null;

	return (
		<div className="flex flex-col gap-1">
			<Heading as="h3" variant="compact">
				Subscription Emotes
			</Heading>

			<div className="flex flex-col gap-4">
				{tier1 && <EmoteSection title="Tier 1" emotes={tier1} as="h4" />}
				{tier2 && <EmoteSection title="Tier 2" emotes={tier2} as="h4" />}
				{tier3 && <EmoteSection title="Tier 3" emotes={tier3} as="h4" />}
			</div>
		</div>
	);
}
