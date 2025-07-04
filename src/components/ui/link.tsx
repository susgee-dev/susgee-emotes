import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import NextLink from 'next/link';

import { cn } from '@/lib/utils';

type LinkProps = ComponentPropsWithoutRef<'a'> & {
	href: string;
	className?: string;
	unstyled?: boolean;
	iconBefore?: ReactNode;
	iconAfter?: ReactNode;
};

export function Link({
	iconAfter,
	iconBefore,
	href,
	className,
	unstyled = false,
	children,
	...props
}: LinkProps) {
	return (
		<NextLink
			className={cn(
				className,
				!unstyled &&
					'relative inline-flex items-center gap-1 pl-1 text-medium text-primary transition-opacity tap-highlight-transparent hover:opacity-hover active:opacity-disabled',
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
