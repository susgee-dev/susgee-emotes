'use client';

import { Modal, ModalBody, ModalContent } from '@heroui/modal';
import { Tooltip } from '@heroui/tooltip';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getEmoteDetails } from '@/app/actions';
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
							<Heading variant="compact">{emote.name}</Heading>

							{isLoading ? (
								<LoadingSpinner text="Loading emote details..." />
							) : emoteDetails ? (
								<div className="flex flex-col gap-6">
									<div className="flex flex-col gap-4 md:flex-row">
										<Image
											unoptimized
											alt={emote.name}
											height={getEmoteDimensions(emote.id, 112).height}
											src={emoteDetails.image}
											style={{ objectFit: 'contain' }}
											width={getEmoteDimensions(emote.id, 112).width}
										/>
										<div className="flex flex-col gap-1">
											{emoteDetails.description && (
												<p className="text-xl font-medium">{emoteDetails.description}</p>
											)}

											{emoteDetails.artist && (
												<p className="text-lg">
													<span className="font-medium">Artist:</span>{' '}
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
											{emoteDetails.owner && (
												<p className="text-lg">
													<span className="font-medium">Owner:</span>{' '}
													<Link href={`/${emoteDetails.owner.login}`} size="lg">
														{emoteDetails.owner.bestName ||
															emoteDetails.owner.displayName ||
															emoteDetails.owner.login}
													</Link>
													{' | '}
													<Link
														align="top"
														href={`https://twitch.tv/${emoteDetails.owner.login}`}
														iconAfter={<IconExternal size={14} />}
														size="lg"
														target="_blank"
													>
														Twitch
													</Link>
												</p>
											)}
											{emoteDetails.setID && (
												<p className="break-word text-lg">
													<span className="font-medium">Emote Set:</span>{' '}
													<Link href={`/set/${emoteDetails.setID}`}>{emoteDetails.setID}</Link>
												</p>
											)}
											<p className="break-word text-sm text-muted-foreground">
												<span className="font-medium">ID:</span> {emote.id}
											</p>
										</div>
									</div>

									<div className="flex flex-col gap-3">
										<div className="border-t border-gray-700" />
										<div className="flex flex-row justify-end gap-4">
											<Button className="w-fit" size="sm" variant="ghost" onClick={handleCopyLink}>
												<IconCopy size={16} />
												{copySuccess ? 'Copied!' : 'Copy URL'}
											</Button>
											<Link className="flex items-center" href={`/emote/${emote.id}`} size="sm">
												<IconExternal size={14} />
												Details Page
											</Link>
										</div>
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
