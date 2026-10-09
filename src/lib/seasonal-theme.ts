export type SeasonalTheme = 'halloween' | 'christmas';

export function getSeasonalTheme(date = new Date()): SeasonalTheme | null {
	const month = date.getMonth();
	if (month === 9) return 'halloween';
	if (month === 11) return 'christmas';
	return null;
}
