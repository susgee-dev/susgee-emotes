import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import NextLink from 'next/link';

import { cn } from '@/lib/utils';

const linkSizes = {
	sm: 'text-sm',
	md: 'text-medium',
	lg: 'text-lg'
};

type LinkProps = ComponentPropsWithoutRef<'a'> & {
	href: string;
	className?: string;
	unstyled?: boolean;
	iconBefore?: ReactNode;
	iconAfter?: ReactNode;
	size?: keyof typeof linkSizes;
};

export function Link({
	iconAfter,
	iconBefore,
	href,
	className,
	size = 'md',
	unstyled = false,
	children,
	...props
}: LinkProps) {
	return (
		<NextLink
			className={cn(
				className,
				linkSizes[size] || 'text-medium',
				!unstyled &&
					'relative inline-flex items-center gap-1 text-primary transition-opacity tap-highlight-transparent hover:opacity-hover active:opacity-disabled',
				'no-underline outline-none'
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
