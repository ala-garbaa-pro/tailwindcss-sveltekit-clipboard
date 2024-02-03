// See https://kit.svelte.dev/docs/types#app

import type { UserType } from './lib/types/User';
import type { Pocketbase } from 'Pocketbase';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			lang: string
			pb: Pocketbase;
			pba: Pocketbase;
			user: UserType;
		}
		// interface PageData {}
		// interface Platform {}
	}
}



export { };
