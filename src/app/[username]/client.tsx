'use client';

import { Input } from '@heroui/input';
import { SearchIcon } from '@heroui/shared-icons';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchChannelData } from '@/app/actions';
import BadgeSection from '@/components/badge-section';
import Channel from '@/components/channel';
import EmoteSection from '@/components/emote-section';
import LoadingSpinner from '@/components/loading-spinner';
import Error from '@/components/ui/error';
import { Link } from '@/components/ui/link';
import NoEmotes from '@/components/ui/no-emotes';
import { User } from '@/types/api/tla';
import { ChannelData } from '@/types/emotes';

export default function ChannelPageClient({ channel }: { channel: User }) {
	const searchParams = useSearchParams();
	const emoteId = searchParams.get('emote') || null;

	const [data, setData] = useState<ChannelData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const twitchEmotes = data?.emotes?.twitch;
	const hasAnyEmotes =
		(twitchEmotes?.follower.length ?? 0) > 0 ||
		(twitchEmotes?.tier1.length ?? 0) > 0 ||
		(twitchEmotes?.tier2.length ?? 0) > 0 ||
		(twitchEmotes?.tier3.length ?? 0) > 0 ||
		(twitchEmotes?.bits.length ?? 0) > 0;

	const shouldShowNoEmotes =
		!channel.isAffiliate &&
		!channel.isPartner &&
		!hasAnyEmotes;

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
					{hasAnyEmotes ? (
							<div className="flex flex-col gap-6">
								<EmoteSection
									emotes={twitchEmotes!.follower}
									initialEmoteId={emoteId}
									searchQuery={searchQuery}
									title="Follower Emotes"
								/>
								<EmoteSection
									emotes={twitchEmotes!.tier1}
									initialEmoteId={emoteId}
									searchQuery={searchQuery}
									title="Tier 1 Subscription Emotes"
								/>
								<EmoteSection
									emotes={twitchEmotes!.tier2}
									initialEmoteId={emoteId}
									searchQuery={searchQuery}
									title="Tier 2 Subscription Emotes"
								/>
								<EmoteSection
									emotes={twitchEmotes!.tier3}
									initialEmoteId={emoteId}
									searchQuery={searchQuery}
									title="Tier 3 Subscription Emotes"
								/>
								<EmoteSection
									emotes={twitchEmotes!.bits}
									initialEmoteId={emoteId}
									searchQuery={searchQuery}
									title="Bits Emotes"
								/>
							</div>
					) : shouldShowNoEmotes ? (
						<NoEmotes />
					) : null}

					{data?.badges?.twitch && <BadgeSection badges={data.badges.twitch} />}
				</div>
			)}
		</>
	);
}
