export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(' ');
}

export function getBestName(login: string, display: string): string {
	return display?.toLowerCase() === login ? display : login;
}

export function pluralize(word: string, count: number, appendix: string = 's'): string {
	return count === 1 ? word : `${word}${appendix}`;
}

/**
 * A map of default Twitch emotes with non-standard sizes, so they can be displayed
 * more accurately in certain situations.
 */
export const WEIRD_EMOTE_SIZES: Record<string, [width: number, height: number]> = {
	'15': [42, 54],
	'16': [44, 54],
	'17': [40, 54],
	'18': [40, 54],
	'22': [38, 54],
	'25': [50, 56],
	'26': [40, 54],
	'28': [78, 54],
	'30': [58, 54],
	'32': [42, 54],
	'33': [50, 64],
	'34': [42, 56],
	'36': [72, 60],
	'40': [42, 54],
	'41': [38, 54],
	'46': [48, 48],
	'47': [48, 48],
	'50': [36, 54],
	'52': [64, 64],
	'65': [80, 60],
	'66': [40, 54],
	'69': [82, 56],
	'73': [42, 60],
	'74': [48, 60],
	'86': [72, 60],
	'87': [48, 60],
	'92': [46, 60],
	'244': [48, 60],
	'354': [40, 60],
	'357': [56, 60],
	'360': [44, 60],
	'483': [40, 36],
	'484': [40, 44],
	'485': [54, 36],
	'486': [42, 64],
	'487': [30, 64],
	'488': [58, 48],
	'489': [40, 36],
	'490': [40, 36],
	'491': [40, 36],
	'492': [40, 36],
	'493': [40, 36],
	'494': [40, 36],
	'495': [40, 36],
	'496': [40, 36],
	'497': [40, 36],
	'498': [40, 36],
	'499': [40, 36],
	'500': [40, 36],
	'501': [40, 36],
	'1896': [40, 60],
	'1898': [52, 56],
	'1899': [44, 60],
	'1900': [66, 60],
	'1901': [48, 56],
	'1902': [54, 58],
	'1904': [48, 60],
	'1906': [48, 60]
};

export function getEmoteDimensions(
	emoteId: string,
	defaultSize: number = 64
): { width: number; height: number } {
	const customSize = WEIRD_EMOTE_SIZES[emoteId];

	if (customSize) {
		const [width, height] = customSize;

		return { width, height };
	}

	return { width: defaultSize, height: defaultSize };
}
