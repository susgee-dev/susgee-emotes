'use client';

import { Input } from '@heroui/input';
import { SearchIcon } from '@heroui/shared-icons';
import Image from 'next/image';
import { useState } from 'react';

import EmoteSection from '@/components/emote-section';
import { IconExternal } from '@/components/icons/external';
import { Heading } from '@/components/ui/heading';
import { Link } from '@/components/ui/link';
import { EmoteSet } from '@/types/api/tla';

type EmoteSetClientProps = {
	emoteSet: EmoteSet;
};

export default function EmoteSetClient({ emoteSet }: EmoteSetClientProps) {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<>
			<div className="flex flex-col gap-6">
				<Link href="/">← back to search</Link>

				<div className="flex flex-col gap-4">
					{emoteSet.owner ? (
						<div className="flex flex-col gap-6 md:flex-row">
							{emoteSet.owner.avatar && (
								<Image
									alt={emoteSet.owner.login}
									className="rounded-2xl border border-primary/30 bg-gradient-bg"
									height={150}
									src={emoteSet.owner.avatar}
									style={{ objectFit: 'contain' }}
									width={150}
								/>
							)}
							<div className="flex flex-col gap-2">
								<Heading as="h1" variant="compact">
									{emoteSet.subtitle}
								</Heading>
								<p className="break-word text-sm text-gray-400">
									<span className="font-medium">Set ID:</span> {emoteSet.id}
								</p>
								<p className="text-lg">
									<span className="font-medium">Owner:</span>{' '}
									<Link href={`/${emoteSet.owner.login}`} size="lg">
										{emoteSet.owner.displayName}
									</Link>
									{' | '}
									<Link
										align="top"
										href={`https://twitch.tv/${emoteSet.owner.login}`}
										iconAfter={<IconExternal size={14} />}
										size="lg"
										target="_blank"
									>
										Twitch
									</Link>
								</p>
							</div>
						</div>
					) : (
						<div>
							<Heading as="h1" variant="compact">
								{emoteSet.subtitle}
							</Heading>
							<p className="break-word text-sm text-gray-400">
								<span className="font-medium">Set ID:</span> {emoteSet.id}
							</p>
						</div>
					)}
				</div>

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

				<div className="flex flex-col gap-12">
					<EmoteSection
						emotes={emoteSet.emotes}
						initialEmoteId={null}
						searchQuery={searchQuery}
						title="Emotes in this set"
					/>
				</div>
			</div>
		</>
	);
}
