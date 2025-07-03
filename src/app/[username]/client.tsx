'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { fetchChannelData } from './actions';

import BadgeSection from '@/components/badge-section';
import EmoteSection from '@/components/emote-section';
import LoadingSpinner from '@/components/loading-spinner';
import Error from '@/components/ui/error';
import { Heading } from '@/components/ui/heading';
import { Link } from '@/components/ui/link';
import { ChannelData } from '@/types/emotes';

export default function ChannelPageClient({ username }: { username: string }) {
	const [data, setData] = useState<ChannelData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadChannelData() {
			try {
				const channel = await fetchChannelData(username);

				setData(channel);
			} catch {
				setError('an unknown error occurred');
			} finally {
				setIsLoading(false);
			}
		}

		loadChannelData();
	}, [username]);

	if (error) {
		return <Error message={error} title="Error Loading Channel" type="notFound" />;
	}

	return (
		<>
			<Link href="/">← back to search</Link>

			<div className="my-4 flex flex-wrap items-center gap-4 border-b border-primary/30 pb-4">
				{data?.channel?.profileImageURL && (
					<Image
						unoptimized
						alt={username}
						className="rounded-full"
						height={60}
						loading="lazy"
						src={data.channel.profileImageURL}
						width={60}
					/>
				)}
				<div>
					<Heading as="h1" className="gradient-text" variant="compact">
						{data?.channel?.displayName ?? username}
					</Heading>
					<p>{data?.channel?.login}</p>
				</div>
			</div>

			{isLoading ? (
				<LoadingSpinner />
			) : (
				<div className="flex flex-col gap-12">
					{data?.emotes?.twitch && (
						<>
							<div className="flex flex-col gap-6">
								<EmoteSection emotes={data.emotes.twitch.follower} title="Follower Emotes" />
								<EmoteSection
									emotes={data.emotes.twitch.tier1}
									title="Tier 1 Subscription Emotes"
								/>
								<EmoteSection
									emotes={data.emotes.twitch.tier2}
									title="Tier 2 Subscription Emotes"
								/>
								<EmoteSection
									emotes={data.emotes.twitch.tier3}
									title="Tier 3 Subscription Emotes"
								/>
								<EmoteSection emotes={data.emotes.twitch.bits} title="Bits Emotes" />
								<EmoteSection emotes={data.emotes.twitch.other} title="Other Emotes" />
							</div>
						</>
					)}

					{data?.badges?.twitch && <BadgeSection badges={data.badges.twitch} />}
				</div>
			)}
		</>
	);
}
