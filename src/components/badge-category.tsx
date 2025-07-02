'use client';

import Badge from '@/components/badge';
import { Heading } from '@/components/ui/heading';
import { TwitchBadgeVersion } from '@/types/api/helix';

type BadgeCategoryProps = {
	title: string;
	badges: TwitchBadgeVersion[];
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
				{badges.map((version) => (
					<Badge key={version.id} version={version} />
				))}
			</div>
		</div>
	);
}
