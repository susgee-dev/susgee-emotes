import SearchChannel from '@/components/search-channel';
import { Heading } from '@/components/ui/heading';

export default function HomePage() {
	return (
		<div className="flex flex-col gap-8 pt-16">
			<main className="mx-auto flex w-full max-w-[35rem] flex-1 flex-col gap-4 p-4">
			<Heading as="h1" variant="compact">
				Twitch Channel Emotes
			</Heading>
			<SearchChannel />
			</main>
		</div>
	);
}