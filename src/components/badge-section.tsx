'use client';

import BadgeCategory from '@/components/badge-category';
import { TwitchBadges } from '@/types/api/tla';

type BadgeSectionProps = {
	badges: TwitchBadges;
};

export default function BadgeSection({ badges }: BadgeSectionProps) {
	const hasSubscriberBadges = Object.keys(badges.subscriber).length > 0;

	const hasBitsBadges = badges.bits.length > 0;

	if (!hasSubscriberBadges && !hasBitsBadges) return null;

	return (
		<div className="grid gap-4 md:grid-cols-2">
			{hasSubscriberBadges && (
				<BadgeCategory as="h3" badges={badges.subscriber} title="Subscriber Badges" />
			)}

			{hasBitsBadges && <BadgeCategory as="h3" badges={badges.bits} title="Bits Badges" />}
		</div>
	);
}
