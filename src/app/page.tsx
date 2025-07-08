import SearchChannel from '@/components/search-channel';
import { Heading } from '@/components/ui/heading';

export default function HomePage() {
	return (
		<>
			<Heading as="h1" className="pt-16" variant="compact">
				Twitch Channel Emotes
			</Heading>
			<SearchChannel />
		</>
	);
}
