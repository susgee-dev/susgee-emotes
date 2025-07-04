'use client';

import Badge from '@/components/badge';
import BadgeCategory from '@/components/badge-category';
import { Heading } from '@/components/ui/heading';
import { CategorizedTwitchBadges } from '@/types/api/helix';

type BadgeSectionProps = {
	badges: CategorizedTwitchBadges;
};

export default function BadgeSection({ badges }: BadgeSectionProps) {
	const hasSubscriberBadges = Object.keys(badges.subscriber).length > 0;

	const hasBitsBadges = badges.bits.length > 0;

	if (!hasSubscriberBadges && !hasBitsBadges) return null;

	return (
		<div className="grid gap-4 md:grid-cols-2">
			{hasSubscriberBadges && (
				<div className="flex flex-col gap-2">
					<Heading as="h3" variant="compact">
						Subscriber Badges
					</Heading>
					<div className="flex flex-wrap gap-2">
						{badges.subscriber.map((version) => (
							<Badge key={version.id} version={version} />
						))}
					</div>
				</div>
			)}

			{hasBitsBadges && <BadgeCategory as="h3" badges={badges.bits} title="Bits Badges" />}
		</div>
	);
}
