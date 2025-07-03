'use client';

import Image from 'next/image';

import { Heading } from '@/components/ui/heading';
import { Link } from '@/components/ui/link';
import { User } from '@/types/api/tla';

export default function Channel({ channel }: { channel: User }) {
	return (
		<>
			<div>
				<div className="flex flex-wrap items-baseline gap-2">
					<Heading as="h1" className="gradient-text" variant="compact">
						{channel?.displayName}
					</Heading>
					<Heading as="h3" variant="compact">
						<span style={{ color: channel.color }}>@{channel.login}</span>
					</Heading>
				</div>
				<p className="text-lg text-muted-foreground">#{channel.id}</p>

				<div className="mt-2">
					<div className="grid grid-cols-[max-content,1fr] gap-x-4 gap-y-0 text-lg">
						<span className="font-bold">Follower:</span>
						<span>{channel.followers}</span>

						<span className="font-bold">Bio:</span>
						<span className="line-clamp-2">{channel.description}</span>

						<span className="font-bold">Role:</span>
						<span>
							{channel.isAffiliate ? 'Affiliate' : channel.isPartner ? 'Partner' : 'Default'}
						</span>

						<span className="font-bold">View on:</span>
						<span>
							<Link
								className="!pl-0 !text-lg"
								href={`https://twitch.tv/${channel.login}`}
								target="_blank"
							>
								Twitch
							</Link>
						</span>
					</div>
				</div>
			</div>

			{channel.avatar && (
				<Image
					alt={channel.login}
					className="object-cover"
					height={192}
					src={channel.avatar}
					width={192}
				/>
			)}
		</>
	);
}
