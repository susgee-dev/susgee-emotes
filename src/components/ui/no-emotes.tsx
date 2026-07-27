export default function NoEmotes() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-default-200 bg-content1 p-10 text-center">
			<img
				src="/sad.png"
				alt="No Twitch emotes"
				className="h-40 w-40 object-contain"
			/>

			<div className="space-y-2">
				<h2 className="text-2xl font-semibold">
					No Twitch Emotes Available
				</h2>

				<p className="max-w-lg text-default-500">
					This channel is not a Twitch Affiliate or Partner, so it
					doesn't have Twitch subscriber or follower emotes.
				</p>
			</div>
		</div>
	);
}