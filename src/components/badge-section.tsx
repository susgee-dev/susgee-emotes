'use client';

import Badge from '@/components/badge';
import BadgeCategory from '@/components/badge-category';
import { Heading } from '@/components/ui/heading';
import { CategorizedTwitchBadges } from '@/types/api/helix';

type BadgeSectionProps = {
	title: string;
	badges: CategorizedTwitchBadges;
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export default function BadgeSection({ title, badges, as = 'h2' }: BadgeSectionProps) {
	const hasSubscriberBadges = Object.keys(badges.subscriber).length > 0;

	const hasBitsBadges = badges.bits.length > 0;
	const hasOtherBadges = Object.keys(badges.other).length > 0;

	if (!hasSubscriberBadges && !hasBitsBadges && !hasOtherBadges) return null;

	return (
		<div className="flex flex-col gap-4">
			<Heading as={as} variant="compact">
				{title}
			</Heading>

			{hasSubscriberBadges && (
				<div className="flex flex-col gap-2">
					<Heading as="h3" variant="compact">
						Subscriber Badges
					</Heading>
					<div className="flex flex-wrap gap-2">
						{Object.entries(badges.subscriber)
							.sort(([durationA], [durationB]) => {
								const numA = parseInt(durationA.match(/\d+/)?.[0] || '0');
								const numB = parseInt(durationB.match(/\d+/)?.[0] || '0');

								if (numA && numB) {
									const isMonthA = durationA.includes('Month');
									const isMonthB = durationB.includes('Month');

									if (isMonthA && !isMonthB) return -1;
									if (!isMonthA && isMonthB) return 1;

									return numA - numB;
								}

								if (durationA === 'Subscriber') return -1;
								if (durationB === 'Subscriber') return 1;

								return durationA.localeCompare(durationB);
							})
							.flatMap(([, badgeVersions]) => badgeVersions)
							.map((version) => (
								<Badge key={version.id} version={version} />
							))}
					</div>
				</div>
			)}

			{hasBitsBadges && <BadgeCategory as="h3" badges={badges.bits} title="Bits Badges" />}

			{hasOtherBadges && (
				<div className="flex flex-col gap-2">
					<Heading as="h3" variant="compact">
						Other Badges
					</Heading>
					<div className="flex flex-col gap-2 pl-4">
						{Object.entries(badges.other).map(([setId, badgeVersions]) => (
							<BadgeCategory
								key={setId}
								badges={badgeVersions}
								title={setId.charAt(0).toUpperCase() + setId.slice(1)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
