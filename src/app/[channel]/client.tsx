'use client';

import { useEffect, useState } from 'react';

import { fetchChannelData } from './actions';

import BadgeSection from '@/components/badge-section';
import EmoteSection from '@/components/emote-section';
import LoadingSpinner from '@/components/loading-spinner';
import Error from '@/components/ui/error';
import { Heading } from '@/components/ui/heading';
import { Link } from '@/components/ui/link';
import { EmoteData } from '@/types/emotes';

export default function ChannelPageClient({ channel }: { channel: string }) {
	const [data, setData] = useState<EmoteData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadChannelData() {
			try {
				const channelData = await fetchChannelData(channel);

				setData(channelData);
			} catch {
				setError('an unknown error occurred');
			} finally {
				setIsLoading(false);
			}
		}

		loadChannelData();
	}, [channel]);

	if (error) {
		return <Error message={error} title="Error Loading Channel" type="notFound" />;
	}

	return (
		<>
			<Link href="/">← back to search</Link>

			<div className="mb-4 flex flex-wrap items-end justify-between border-b border-primary/30 pb-4">
				<Heading as="h3" variant="compact">
					channel emotes/badges for:
				</Heading>
				<Heading as="h1" className="gradient-text flex w-fit flex-col" variant="compact">
					{channel}
				</Heading>
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
