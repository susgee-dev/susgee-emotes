import SearchChannel from '@/components/search-channel';
import Error from '@/components/ui/error';

export default function NotFound() {
	return (
		<Error
			message="the channel you're looking for doesn't exist or couldn't be found"
			title="channel not found"
			type="notFound"
		>
			<div className="mt-8 w-full max-w-md">
				<SearchChannel />
			</div>
		</Error>
	);
}
