// FILE: +page.server.ts

export const prerender = false


import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types';

type Props = {
    locals: App.Locals,
    params: { clipboardID: string }
}

export const load: PageServerLoad = async ({ locals: { pba }, params }: Props) => {

    console.log(`🟩 /[clipboardID equal (${params.clipboardID})]/+page.server.ts -> load`);

    const clipboard = await pba.collection('clipboards').getOne(`${params.clipboardID}`, {
        fields: "id,title,keywords,content,created,updated"
    });

    if (!clipboard) {
        throw error(404, 'Post not found')
    }

    return { clipboard }
}
