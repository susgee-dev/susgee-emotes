'use client';

import { Modal as HeroModal, ModalBody, ModalContent, ModalProps } from '@heroui/modal';
import { ReactNode } from 'react';

export interface SusgeeModalProps extends Omit<ModalProps, 'children'> {
	children: ReactNode;
	contentClassName?: string;
	bodyClassName?: string;
}

export function Modal({
	children,
	contentClassName = '',
	bodyClassName = '',
	classNames = {},
	size = 'lg',
	...props
}: SusgeeModalProps) {
	return (
		<HeroModal
			classNames={{
				closeButton: 'text-2xl',
				...classNames
			}}
			size={size}
			{...props}
		>
			<ModalContent className={`border border-primary/30 bg-gradient-bg ${contentClassName}`}>
				<ModalBody className={`py-4 ${bodyClassName}`}>{children}</ModalBody>
			</ModalContent>
		</HeroModal>
	);
}
