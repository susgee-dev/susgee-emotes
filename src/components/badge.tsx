'use client';

import { Tooltip } from '@heroui/tooltip';
import Image from 'next/image';
import { useState } from 'react';

import { Heading } from '@/components/ui/heading';
import { Modal } from '@/components/ui/modal';
import { Badge as TwitchBadge } from '@/types/api/tla';

export default function Badge({ badge }: { badge: TwitchBadge }) {
	const [isOpen, setIsOpen] = useState(false);
	const description = badge.description ? ` (${badge.description})` : '';

	const handleBadgeClick = () => {
		setIsOpen(true);
	};

	const getBadgeDetails = () => {
		if (badge.name.toLowerCase().includes('subscriber')) {
			return {
				type: 'Subscriber Badge',
				details: [badge.name, `Tier ${badge.id % 10}`]
			};
		}

		return {
			type: 'Bits Badge',
			details: [`Cost: ${badge.id} Bits`]
		};
	};

	const badgeDetails = getBadgeDetails();

	return (
		<>
			<Tooltip
				color="foreground"
				content={
					<Heading as="h4" variant="compact">
						{badge.name}
						{description}
					</Heading>
				}
				placement="bottom"
			>
				<Image
					unoptimized
					alt={badge.name}
					className="mx-0.5 inline-block cursor-pointer align-sub"
					height={36}
					loading="lazy"
					src={badge.image}
					title={badge.name}
					width={36}
					onClick={handleBadgeClick}
				/>
			</Tooltip>

			<Modal isOpen={isOpen} size="md" onClose={() => setIsOpen(false)}>
				<>
					<Heading variant="compact">{badgeDetails.type}</Heading>

					<div className="mt-4 flex flex-col gap-4 md:flex-row">
						<Image
							unoptimized
							alt={badge.name}
							height={72}
							src={badge.image}
							style={{ objectFit: 'contain' }}
							width={72}
						/>
						<div className="flex flex-col gap-1">
							{badgeDetails.details.map((detail, index) => (
								<p key={index} className="text-lg font-medium">
									{detail}
								</p>
							))}
						</div>
					</div>
				</>
			</Modal>
		</>
	);
}
