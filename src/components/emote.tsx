'use client';

import { Modal, ModalBody, ModalContent } from '@heroui/modal';
import { Tooltip } from '@heroui/tooltip';
import Image from 'next/image';
import { useState } from 'react';

import { getEmoteDetails } from '@/app/[username]/actions';
import { IconExternal } from '@/components/icons/external';
import LoadingSpinner from '@/components/loading-spinner';
import { Heading } from '@/components/ui/heading';
import { Link } from '@/components/ui/link';
import logger from '@/lib/logger';
import { cn } from '@/lib/utils';
import { Emote as TwitchEmote } from '@/types/api/tla';

export default function Emote({
	emote,
	searchQuery = ''
}: {
	emote: TwitchEmote;
	searchQuery?: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [emoteDetails, setEmoteDetails] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(false);

	const isMatch = !searchQuery || emote.name.toLowerCase().includes(searchQuery.toLowerCase());

	const handleEmoteClick = async () => {
		setIsOpen(true);
		setIsLoading(true);

		try {
			const details = await getEmoteDetails(emote.id);

			setEmoteDetails(details);
		} catch (error) {
			logger.error('Failed to fetch emote details:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Tooltip
				color="foreground"
				content={
					<>
						<Heading as="h3" variant="compact">
							{emote.name}
						</Heading>
						{emote.description && (
							<Heading as="h4" variant="compact">
								{emote.description}
							</Heading>
						)}
					</>
				}
				placement="bottom"
			>
				<Image
					unoptimized
					alt={emote.name}
					className={cn('cursor-pointer duration-300', !isMatch && 'opacity-20')}
					height={56}
					loading="lazy"
					src={emote.image}
					title={emote.name}
					width={56}
					onClick={handleEmoteClick}
				/>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ModalContent>
					<ModalBody className="py-4">
						<>
							<div>
								<Heading variant="compact">{emote.name}</Heading>
								<Heading as="h4" className="break-word" variant="compact">
									{emote.id}
								</Heading>
							</div>

							{isLoading ? (
								<LoadingSpinner text="Loading emote details..." />
							) : emoteDetails ? (
								<div className="flex flex-col gap-4">
									<Image
										unoptimized
										alt={emote.name}
										height={112}
										src={emoteDetails.image}
										width={112}
									/>
									<div className="flex flex-col gap-2">
										<div>
											<strong>Type:</strong> {emoteDetails.type}
										</div>
										{emoteDetails.tier && (
											<div>
												<strong>Tier:</strong> {emoteDetails.tier}
											</div>
										)}
										{emoteDetails.bits && (
											<div>
												<strong>Bits:</strong> {emoteDetails.bits}
											</div>
										)}
										{emoteDetails.artist && (
											<div>
												<strong>Artist:</strong>{' '}
												<Link href={`/${emoteDetails.artist}`}>{emoteDetails.artist}</Link>{' '}
												<Link
													href={`https://twitch.tv/${emoteDetails.artist}`}
													iconAfter={<IconExternal size={14} />}
													target="_blank"
												>
													Twitch
												</Link>
											</div>
										)}
									</div>
								</div>
							) : (
								<div className="flex justify-center p-4">
									<p>No emote details available</p>
								</div>
							)}
						</>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
