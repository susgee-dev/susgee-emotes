'use client';

import { cn } from '@/lib/utils';

export default function LoadingSpinner({
	text,
	size = 'lg'
}: {
	text?: string;
	size?: 'sm' | 'md' | 'lg';
}) {
	const sizes = {
		sm: 'size-2',
		md: 'size-4',
		lg: 'size-8'
	};

	return (
		<div className="flex items-center justify-center py-16">
			<svg
				className={cn('animate-spin text-primary', sizes[size])}
				fill="none"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="3"
				/>
				<path
					className="opacity-75"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					fill="currentColor"
					strokeWidth="1"
				/>
			</svg>
			{text && <span className="ml-3 text-lg font-medium text-ink-muted">{text}</span>}
		</div>
	);
}
