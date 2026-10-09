import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/components/(input|modal|popover|form).js'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-text': 'var(--gradient-text)',
				'gradient-bg': 'var(--gradient-bg)'
			},
			colors: {
				primary: {
					DEFAULT: 'var(--primary)',
					30: 'var(--primary-30)',
					60: 'var(--primary-60)',
					dark: 'var(--primary-dark)'
				},
				ink: {
					bright: 'var(--ink-bright)',
					DEFAULT: 'var(--ink)',
					muted: 'var(--ink-muted)',
					faint: 'var(--ink-faint)'
				},
				surface: {
					canvas: 'var(--surface-canvas)',
					inset: 'var(--surface-inset)',
					panel: 'var(--surface-panel)',
					raised: 'var(--surface-raised)',
					overlay: 'var(--surface-overlay)'
				},
				line: {
					soft: 'var(--line-soft)',
					DEFAULT: 'var(--line)',
					strong: 'var(--line-strong)'
				},
				font: {
					DEFAULT: 'var(--ink)',
					light: 'var(--ink-bright)',
					dark: 'var(--ink-muted)'
				},
				muted: {
					foreground: 'var(--ink-muted)'
				},
				twitch: {
					DEFAULT: 'var(--twitch)',
					dark: 'var(--twitch-dark)'
				},
				ring: 'var(--ring)',
				input: 'var(--line)',
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--ink-bright)'
				},
				danger: {
					DEFAULT: 'var(--danger)',
					surface: 'var(--danger-surface)',
					border: 'var(--danger-border)'
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)'
				},
				success: {
					DEFAULT: 'var(--success)',
					surface: 'var(--success-surface)'
				}
			},
			borderRadius: {
				control: 'var(--radius-control)',
				panel: 'var(--radius-panel)',
				chip: 'var(--radius-chip)'
			}
		}
	},
	darkMode: 'class',
	plugins: [heroui()]
};

export default config;
