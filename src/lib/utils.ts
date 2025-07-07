export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(' ');
}

export function getBestName(login: string, display: string): string {
	return display?.toLowerCase() === login ? display : login;
}

export function pluralize(word: string, count: number, appendix: string = 's'): string {
	return count === 1 ? word : `${word}${appendix}`;
}
