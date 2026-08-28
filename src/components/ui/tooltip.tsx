'use client';

import { Tooltip as HeroTooltip, TooltipProps } from '@heroui/tooltip';

export function Tooltip({ classNames, ...props }: TooltipProps) {
	return (
		<HeroTooltip
			classNames={{
				...classNames,
				content: [
					'!rounded-control !border !border-line !bg-surface-raised px-3 py-1.5 text-sm !text-ink-bright shadow-lg',
					classNames?.content
				]
			}}
			{...props}
		/>
	);
}
