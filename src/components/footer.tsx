'use client';

import { Link } from '@/components/ui/link';

export default function Footer() {
	return (
		<footer>
			<p className="px-1 text-center">
				Ideas for improvements? Discovered a bug? Feel free to create an{' '}
				<Link href="https://github.com/susgee-dev/susgee-emotes/issues/new">
					issue on our GitHub
				</Link>
				.
			</p>
			<div className="flex flex-col justify-center gap-1 p-2 text-center text-ink-faint md:flex-row md:gap-2">
				<p>
					&copy; {new Date().getFullYear()} <Link href="https://susgee.dev">susgee.dev</Link>
				</p>
				<span className="hidden md:flex"> • </span>
				<p>not affiliated with twitch</p>
				<span className="hidden md:flex"> • </span>
				<p>
					Made with 🤍 by
					<Link className="pl-1" href="https://twitch.tv/maersux">
						maersux
					</Link>
				</p>
				<span className="hidden md:flex"> • </span>
				<p>
					<Link href="/global">Global Emotes</Link>
				</p>
			</div>
		</footer>
	);
}
