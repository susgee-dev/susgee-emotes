'use client';

export default function LoadingSpinner({ text }: { text?: string }) {
	return (
		<div className="flex items-center justify-center py-16">
			<div className="relative">
				<div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
				<div
					className="absolute inset-0 h-8 w-8 animate-spin rounded-full border-2 border-transparent border-t-primary/60"
					style={{ animationDelay: '-0.5s', animationDuration: '1.5s' }}
				/>
			</div>
			{text && <span className="ml-3 text-lg font-medium text-primary/70">{text}</span>}
		</div>
	);
}
