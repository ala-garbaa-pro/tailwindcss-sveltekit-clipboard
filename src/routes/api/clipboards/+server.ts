import { fail, json } from "@sveltejs/kit";

export const GET = async ({ setHeaders, request, locals: { pba } }) => {
    console.log(`🟩 /api/clipboards/+server.ts`);

    // Casting request.url to URL type
    const url = new URL(request.url);

    // Accessing query parameters
    const queryParams = new URLSearchParams(url.searchParams);

    let page = 1;

    if (queryParams.get('page')) {
        page = Number(queryParams.get('page'))
    }

    if (isNaN(page)) {
        return json({ error: "page number is invalid" });
    }

    const full = queryParams.get('full') && queryParams.get('full') === "true" || false

    if (typeof full !== "boolean") return json({ error: "full param is invalid" })

    let clipboards;

    // as the underlying data
    setHeaders({
        'cache-control': `public, max-age=${15 * 60}` // 15 minutes
    });

    try {
        clipboards = await pba.collection('clipboards').getList(page, 8, {
            sort: '-created',
            fields: `id,keywords,title,${full ? 'content,' : ''}created,updated`
        });

    } catch (error) {
        console.log("🙄 ~ error:", error)
        fail(401, {
            message: 'Something went wrong'
        });
    }

    return json(clipboards);
};
