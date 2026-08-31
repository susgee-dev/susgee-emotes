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
				'gradient-text': 'linear-gradient(145deg, #b87fed 0%, #601e9e 100%)',
				'gradient-bg': 'linear-gradient(145deg, #06040c 0%, #100a1c 100%)'
			},
			colors: {
				primary: {
					DEFAULT: '#b87fed',
					30: '#493462',
					60: '#78549d',
					dark: '#601e9e'
				},
				ink: {
					bright: '#f2eff7',
					DEFAULT: '#cfcfcf',
					muted: '#9a949f',
					faint: '#6f6a75'
				},
				surface: {
					canvas: '#0b0714',
					inset: '#130f1d',
					panel: '#1a1426',
					raised: '#241d33',
					overlay: '#0d0916'
				},
				line: {
					soft: '#221b30',
					DEFAULT: '#2d2540',
					strong: '#3d3453'
				},
				font: {
					DEFAULT: '#cfcfcf',
					light: '#e0e0e0',
					dark: '#7a7a7a'
				},
				muted: {
					foreground: '#9a949f'
				},
				twitch: {
					DEFAULT: '#6441a5',
					dark: '#5a3a94'
				},
				ring: '#b87fed',
				input: '#2d2540',
				accent: {
					DEFAULT: '#2a2238',
					foreground: '#f2eff7'
				},
				danger: {
					DEFAULT: '#e0555b',
					surface: '#3a1f26',
					border: '#6b2f38'
				},
				destructive: {
					DEFAULT: '#c73a44',
					foreground: '#ffffff'
				},
				success: {
					DEFAULT: '#3fb27f',
					surface: '#16321f'
				}
			},
			borderRadius: {
				control: '0.75rem',
				panel: '1rem',
				chip: '0.5rem'
			}
		}
	},
	darkMode: 'class',
	plugins: [heroui()]
};

export default config;
