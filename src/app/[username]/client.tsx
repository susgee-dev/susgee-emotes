'use client';

import { useEffect, useState } from 'react';

import { fetchChannelData } from './actions';

import BadgeSection from '@/components/badge-section';
import Channel from '@/components/channel';
import EmoteSection from '@/components/emote-section';
import LoadingSpinner from '@/components/loading-spinner';
import Error from '@/components/ui/error';
import { Link } from '@/components/ui/link';
import { User } from '@/types/api/tla';
import { ChannelData } from '@/types/emotes';

export default function ChannelPageClient({ channel }: { channel: User }) {
	const [data, setData] = useState<ChannelData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadChannelData() {
			try {
				const data = await fetchChannelData(channel?.id || '');

				setData(data);
			} catch {
				setError('an unknown error occurred');
			} finally {
				setIsLoading(false);
			}
		}

		loadChannelData();
	}, [channel.id]);

	if (error) {
		return <Error message={error} title="Error Loading Channel" type="notFound" />;
	}

	return (
		<>
			<Link className="mb-4 inline-block" href="/">
				← back to search
			</Link>

			<Channel channel={channel} />

			{isLoading ? (
				<LoadingSpinner />
			) : (
				<div className="flex flex-col gap-12">
					{data && data.emotes.twitch && (
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
							</div>
						</>
					)}

					{data?.badges?.twitch && <BadgeSection badges={data.badges.twitch} />}
				</div>
			)}
		</>
	);
}
