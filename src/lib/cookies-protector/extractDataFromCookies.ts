import { cookiesName } from '$lib/constants';

export const extractDataFromCookies = async (input: string): Promise<string | null> => {
	const startIndex = input.indexOf(`${cookiesName}=`) + cookiesName.length + 1;

	const endIndex = input.indexOf('; Path=');

	if (startIndex >= 0 && endIndex > startIndex) {
		const extractedPart = input.substring(startIndex, endIndex);
		return decodeURIComponent(extractedPart);
	}

	return null;
};
