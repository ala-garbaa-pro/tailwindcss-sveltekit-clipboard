import PocketBase from 'pocketbase';
import { cookiesName } from '$lib/constants';
import { cookiesDeprotectorFromHeader } from '$lib/cookies-protector/cookiesDeprotectorFromHeader';
import { cookiesProtector } from '$lib/cookies-protector/cookiesProtector';

import { PB_URL, PB_EMAIL, PB_PASSWORD } from '$env/static/private';

export async function handle({ event, resolve }) {
	// console.log(`🟩 /hooks.server.ts - handle --START->`);

	event.locals.pb = new PocketBase(PB_URL);
	event.locals.pba = new PocketBase(PB_URL);
	
	// globally disable auto cancellation
	event.locals.pb.autoCancellation(false);
	event.locals.pba.autoCancellation(false);

	await event.locals.pba.admins.authWithPassword(PB_EMAIL, PB_PASSWORD);

	// Get cookies from header
	const encryptedCookies = (await event.request.headers.get('cookie')) || '';

	// Load the store data from the request cookie string
	if (encryptedCookies) {
		const decryptedCookies = await cookiesDeprotectorFromHeader(encryptedCookies);
		await event.locals.pb.authStore.loadFromCookie(decryptedCookies, `${cookiesName}`);
	}

	try {
		// Refresh the auth store if is valid

		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = { ...structuredClone(event.locals.pb.authStore.model) };
		}
	} catch (_) {
		console.log('🚀 ~ file: hooks.server.ts:35 ~ handle ~ _:', _);
		const err = _ as Error;
		console.log('❌ ~ error in Hook', err.message);
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	const cookie = await event.locals.pb.authStore.exportToCookie(
		{ secure: false },
		`${cookiesName}`
	);
	if (cookie === null) return response;
	const protectedCookies = String(await cookiesProtector(cookie));
	response.headers.append('set-cookie', protectedCookies);

	// console.log(`🟩 /hooks.server.ts - handle --END->`);

	return response;
}
