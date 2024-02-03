import { encryptText } from '$lib/cyber-encrypt/text/encryptText';
import { constructCookies } from './constructCookies';
import { extractDataFromCookies } from './extractDataFromCookies';

export const cookiesProtector = async (cookies: string) => {
	// const exampleCookies = `O=%7B%22token%22%3A%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2OTQ0Mjk0NjgsImlkIjoiaXdtMzJtbGpjMXV6amMyIiwidHlwZSI6ImF1dGhSZWNvcmQifQ.IvY0n0HREi1U_0phCZ26shm75wgSOPsg-LjjJVVRAXk%22%2C%22model%22%3A%7B%22avatar%22%3A%22https%3A%2F%2Fjira.soprahronline.com%2Fsecure%2Fuseravatar%3FownerId%3DJIRAUSER26236%26avatarId%3D19026%22%2C%22collectionId%22%3A%22_pb_users_auth_%22%2C%22collectionName%22%3A%22users%22%2C%22created%22%3A%222023-08-28%2010%3A51%3A08.488Z%22%2C%22crypted_cookies%22%3A%221a1224dd52bb6256904817ea562a29ee431b49b1ab178c59373cdb57877faa21mKTEUhyrqWokEZUNSRH945qsf4q4f21qs2fqs54Qh7h77hr87eh85sdh7h77hr87eh85sd%22%2C%22crypted_maia_password%22%3A%226c09e1517dc338c5394229f7726caa87844a144b83b905d10f40f115ec67b14d8YNgg4sdg4sg5zezlkLweg3H45qsf4q4f21qs2fqs54yWZzbbmAh7h77hr87eh85sdh7h77hr87eh85sd%22%2C%22email%22%3A%22Liam29451104qsf%40soprahr.com%22%2C%22emailVisibility%22%3Atrue%2C%22fullname%22%3A%22Ala%20GARBAA%22%2C%22id%22%3A%22iwm32mljc1uzjc2%22%2C%22updated%22%3A%222023-08-28%2010%3A51%3A08.488Z%22%2C%22username%22%3A%22qsfqsf%22%2C%22verified%22%3Afalse%7D%7D; Path=/; Expires=Mon, 11 Sep 2023 10:51:08 GMT; HttpOnly; SameSite=Strict`;

	const extractedData = await extractDataFromCookies(cookies);

	if (extractedData !== null) {
		const encryptDataPart = await encryptText(extractedData);

		const prefix = cookies.substring(0, cookies.indexOf('=') + 1);

		const suffix = cookies.substring(cookies.indexOf('; Path='));

		const fullString = constructCookies(encryptDataPart, prefix, suffix);

		return fullString;
	} else {
		return null;
	}
};
