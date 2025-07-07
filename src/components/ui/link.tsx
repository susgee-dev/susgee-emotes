import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import NextLink from 'next/link';

import { cn } from '@/lib/utils';

const sizes = {
	sm: 'text-sm',
	md: 'text-medium',
	lg: 'text-lg'
};

const alignments = {
	top: 'items-start',
	center: 'items-center',
	bottom: 'items-end'
};

type LinkProps = ComponentPropsWithoutRef<'a'> & {
	href: string;
	className?: string;
	unstyled?: boolean;
	iconBefore?: ReactNode;
	iconAfter?: ReactNode;
	size?: keyof typeof sizes;
	align?: keyof typeof alignments;
};

export function Link({
	iconAfter,
	iconBefore,
	href,
	className,
	size = 'md',
	align = 'center',
	unstyled = false,
	children,
	...props
}: LinkProps) {
	return (
		<NextLink
			className={cn(
				sizes[size] || 'text-medium',
				alignments[align] || 'items-center',
				!unstyled &&
					'relative inline-flex gap-1 text-primary transition-opacity tap-highlight-transparent hover:opacity-hover active:opacity-disabled',
				'no-underline outline-none',
				className
			)}
			href={href}
			{...props}
		>
			{iconBefore}
			{children}
			{iconAfter}
		</NextLink>
	);
}
