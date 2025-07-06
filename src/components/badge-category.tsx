'use client';

import Badge from '@/components/badge';
import { Heading } from '@/components/ui/heading';
import { Badge as TwitchBadge } from '@/types/api/tla';

type BadgeCategoryProps = {
	title: string;
	badges: TwitchBadge[];
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export default function BadgeCategory({ title, badges, as = 'h4' }: BadgeCategoryProps) {
	if (!badges.length) return null;

	return (
		<div className="flex flex-col gap-2">
			<Heading as={as} variant="compact">
				{title}
			</Heading>
			<div className="flex flex-wrap gap-2">
				{badges.map((badge) => (
					<Badge key={badge.id} badge={badge} />
				))}
			</div>
		</div>
	);
}
