'use client';

import Image from 'next/image';

import { IconExternal } from '@/components/icons/external';
import { Heading } from '@/components/ui/heading';
import { Link } from '@/components/ui/link';
import { User } from '@/types/api/tla';

export default function Channel({ channel }: { channel: User }) {
	return (
		<div className="flex flex-col gap-6 pb-4 md:flex-row">
			{channel.avatar && (
				<Image
					alt={channel.login}
					className="rounded-2xl border border-primary/30"
					height={150}
					src={channel.avatar}
					width={150}
				/>
			)}
			<div>
				<Heading as="h1" variant="compact">
					<span style={{ color: channel.color }}>{channel?.displayName}</span>
				</Heading>
				<div className="flex flex-wrap items-baseline gap-2">
					<Heading as="h3" variant="compact">
						@{channel.login}
					</Heading>
					<p className="text-lg text-muted-foreground">#{channel.id}</p>
				</div>

				<p className="text-lg">{channel.followers.toLocaleString('en-US')} Follower</p>

				{channel.role && <p className="text-lg">{channel.role}</p>}

				<p>
					<Link
						className="items-start !pl-0 !text-lg"
						href={`https://twitch.tv/${channel.login}`}
						iconAfter={<IconExternal size={14} />}
						target="_blank"
					>
						Twitch
					</Link>
				</p>
			</div>
		</div>
	);
}
