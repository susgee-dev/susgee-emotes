import { IconProps } from '@/types/icons';

export function IconCopy({ size = 24, color = '' }: IconProps) {
	return (
		<svg
			className={color}
			fill="none"
			height={size}
			shapeRendering="geometricPrecision"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			width={size}
			xmlns="http://www.w3.org/2000/svg"
		>
			<g stroke="currentColor">
				<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
				<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
			</g>
		</svg>
	);
} 