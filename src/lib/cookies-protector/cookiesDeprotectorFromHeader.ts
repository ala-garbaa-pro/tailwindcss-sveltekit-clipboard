import { decryptText } from '$lib/cyber-encrypt/text/decryptText';
import { cookiesName } from '$lib/constants';

export const cookiesDeprotectorFromHeader = async (encryptedCookies: string) => {
	// console.log("🚀 ~ file: cookiesDeprotectorFromHeader.ts:6 ~ cookiesDeprotectorFromHeader ~ cookiesName.length:", cookiesName.length)
	// console.log("🚀 ~ file: cookiesDeprotectorFromHeader.ts:6 ~ cookiesDeprotectorFromHeader ~ cookiesName.length+1:", cookiesName.length+1)
	
	const startIndex = encryptedCookies.indexOf(`${cookiesName}=`) + cookiesName.length + 1;
	const endIndex = encryptedCookies.length;
	// console.log("🚀 ~ file: cookiesDeprotectorFromHeader.ts:7 ~ cookiesDeprotectorFromHeader ~ endIndex:", endIndex)
	// console.log("🚀 ~ file: cookiesDeprotectorFromHeader.ts:7 ~ cookiesDeprotectorFromHeader ~ startIndex:", startIndex)

	if (startIndex >= 0 && endIndex > startIndex) {
		const extractedPart = encryptedCookies.substring(startIndex, endIndex);
		// console.log("🚀 ~ file: cookiesDeprotectorFromHeader.ts:10 ~ cookiesDeprotectorFromHeader ~ extractedPart:", extractedPart)
		const decryptDataPart = await decryptText(extractedPart);
		// console.log("🚀 ~ file: cookiesDeprotectorFromHeader.ts:12 ~ cookiesDeprotectorFromHeader ~ decryptDataPart:", decryptDataPart)

		return `${cookiesName}=` + encodeURIComponent(decryptDataPart);
	} else {
		return null;
	}
};
