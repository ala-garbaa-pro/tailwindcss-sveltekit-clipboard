export const constructCookies = (extractedPart: string, prefix: string, suffix: string): string => {
	const fullString = prefix + encodeURIComponent(extractedPart) + suffix;
	return fullString;
};
