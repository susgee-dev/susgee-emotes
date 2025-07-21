'use client';

import { Input } from '@heroui/input';
import { SearchIcon } from '@heroui/shared-icons';
import { useSearchParams } from 'next/navigation';
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
	const searchParams = useSearchParams();
	const emoteId = searchParams.get('emote');
	
	const [data, setData] = useState<ChannelData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');

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
			<Link href="/">← back to search</Link>

			<Channel channel={channel} />

			<Input
				color="primary"
				name="search-emotes"
				placeholder="Search emotes"
				radius="sm"
				startContent={<SearchIcon />}
				type="text"
				value={searchQuery}
				variant="bordered"
				onChange={(e) => setSearchQuery(e.target.value)}
			/>

			{isLoading ? (
				<LoadingSpinner text="Loading emotes and badges..." />
			) : (
				<div className="flex flex-col gap-12">
					{data?.emotes?.twitch && (
						<>
							<div className="flex flex-col gap-6">
								<EmoteSection
									emotes={data.emotes.twitch.follower}
									searchQuery={searchQuery}
									title="Follower Emotes"
									initialEmoteId={emoteId || undefined}
								/>
								<EmoteSection
									emotes={data.emotes.twitch.tier1}
									searchQuery={searchQuery}
									title="Tier 1 Subscription Emotes"
									initialEmoteId={emoteId || undefined}
								/>
								<EmoteSection
									emotes={data.emotes.twitch.tier2}
									searchQuery={searchQuery}
									title="Tier 2 Subscription Emotes"
									initialEmoteId={emoteId || undefined}
								/>
								<EmoteSection
									emotes={data.emotes.twitch.tier3}
									searchQuery={searchQuery}
									title="Tier 3 Subscription Emotes"
									initialEmoteId={emoteId || undefined}
								/>
								<EmoteSection
									emotes={data.emotes.twitch.bits}
									searchQuery={searchQuery}
									title="Bits Emotes"
									initialEmoteId={emoteId || undefined}
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
