'use client';

import { Input } from '@heroui/input';
import { SearchIcon } from '@heroui/shared-icons';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchGlobalEmotes } from './actions';

import EmoteSection from '@/components/emote-section';
import LoadingSpinner from '@/components/loading-spinner';
import Error from '@/components/ui/error';
import { Heading } from '@/components/ui/heading';
import { Link } from '@/components/ui/link';
import { GlobalData } from '@/types/emotes';

export default function GlobalEmotesClient() {
	const searchParams = useSearchParams();
	const emoteId = searchParams.get('emote') || null;

	const [data, setData] = useState<GlobalData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		async function loadGlobalEmotes() {
			try {
				const data = await fetchGlobalEmotes();

				setData(data);
			} catch {
				setError('an unknown error occurred');
			} finally {
				setIsLoading(false);
			}
		}

		loadGlobalEmotes();
	}, []);

	if (error) {
		return <Error message={error} title="Error Loading Global Emotes" type="notFound" />;
	}

	return (
		<>
			<Link href="/">← back to search</Link>

			<Heading as="h1" variant="compact">
				Twitch Global Emotes
			</Heading>

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
				<LoadingSpinner text="Loading global emotes..." />
			) : (
				<div className="flex flex-col gap-12">
					{data?.emotes?.twitch && (
						<>
							<div className="flex flex-col gap-6">
								<EmoteSection
									emotes={data.emotes.twitch.global}
									initialEmoteId={emoteId}
									searchQuery={searchQuery}
									title="Global Emotes"
								/>
								<EmoteSection
									emotes={data.emotes.twitch.turbo}
									initialEmoteId={emoteId}
									searchQuery={searchQuery}
									title="Turbo Emotes"
								/>
								<EmoteSection
									emotes={data.emotes.twitch.prime}
									initialEmoteId={emoteId}
									searchQuery={searchQuery}
									title="Prime Emotes"
								/>
								<EmoteSection
									emotes={data.emotes.twitch.hypeTrain}
									initialEmoteId={emoteId}
									searchQuery={searchQuery}
									title="Hype Train Emotes"
								/>
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
}
