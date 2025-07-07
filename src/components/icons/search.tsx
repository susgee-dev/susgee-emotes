import { IconProps } from '@/types/icons';

export function IconSearch({ size = 24, color = '' }: IconProps) {
	return (
		<svg
			className={color}
			fill="none"
			height={size}
			viewBox="0 0 24 24"
			width={size}
			xmlns="http://www.w3.org/2000/svg"
		>
			<g stroke="currentColor">
				<circle cx="11" cy="11" r="8" />
				<path d="m21 21-4.3-4.3" />
			</g>
		</svg>
	);
}
