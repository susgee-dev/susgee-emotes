'use client';

import { Modal, ModalBody, ModalContent } from '@heroui/modal';
import { Tooltip } from '@heroui/tooltip';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getEmoteDetails } from '@/app/[username]/actions';
import { IconCopy } from '@/components/icons/copy';
import { IconExternal } from '@/components/icons/external';
import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Link } from '@/components/ui/link';
import logger from '@/lib/logger';
import { cn, getEmoteDimensions } from '@/lib/utils';
import { Emote as TwitchEmote } from '@/types/api/tla';

export default function Emote({
	emote,
	searchQuery = '',
	initiallyOpen = false
}: {
	emote: TwitchEmote;
	searchQuery?: string;
	initiallyOpen?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(initiallyOpen);
	const [emoteDetails, setEmoteDetails] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [copySuccess, setCopySuccess] = useState(false);

	const isMatch = !searchQuery || emote.name.toLowerCase().includes(searchQuery.toLowerCase());
	const mainEmoteDimensions = getEmoteDimensions(emote.id);
	const modalEmoteDimensions = getEmoteDimensions(emote.id, 112);

	useEffect(() => {
		if (initiallyOpen) {
			const loadEmoteDetails = async () => {
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

			loadEmoteDetails();
		}
	}, [initiallyOpen, emote.id]);

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

	const handleCopyLink = async () => {
		const url = new URL(window.location.href);

		url.searchParams.set('emote', emote.id);
		const link = url.toString();

		try {
			await navigator.clipboard.writeText(link);
			setCopySuccess(true);
			setTimeout(() => setCopySuccess(false), 2000);
		} catch (error) {
			logger.error('Failed to copy link:', error);
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
					height={mainEmoteDimensions.height}
					loading="lazy"
					src={emote.image}
					title={emote.name}
					width={mainEmoteDimensions.width}
					onClick={handleEmoteClick}
				/>
			</Tooltip>

			<Modal
				classNames={{
					closeButton: 'text-2xl'
				}}
				isOpen={isOpen}
				size="lg"
				onClose={() => setIsOpen(false)}
			>
				<ModalContent className="border border-primary/30 bg-gradient-bg">
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
										height={modalEmoteDimensions.height}
										src={emoteDetails.image}
										width={modalEmoteDimensions.width}
									/>
									<p className="text-lg font-medium">{emoteDetails.description}</p>
									{emoteDetails.artist && (
										<p className="text-lg">
											<strong>Artist:</strong>{' '}
											<Link href={`/${emoteDetails.artist}`} size="lg">
												{emoteDetails.artist}
											</Link>
											{' | '}
											<Link
												align="top"
												href={`https://twitch.tv/${emoteDetails.artist}`}
												iconAfter={<IconExternal size={14} />}
												size="lg"
												target="_blank"
											>
												Twitch
											</Link>
										</p>
									)}
									<Button className="w-fit !p-0" size="sm" variant="ghost" onClick={handleCopyLink}>
										<IconCopy size={16} />
										{copySuccess ? 'Copied!' : 'Copy emote URL'}
									</Button>
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
