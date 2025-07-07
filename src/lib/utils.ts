export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(' ');
}

export function getBestName(login: string, display: string): string {
	return display?.toLowerCase() === login ? display : login;
}
