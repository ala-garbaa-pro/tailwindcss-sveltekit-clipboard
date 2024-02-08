import { validSearchTypes, type SearchClipboardByType } from "$lib/types/clipboard.type.js";
import { fail, json } from "@sveltejs/kit";

export const GET = async ({ setHeaders, request, locals: { pba } }) => {
    console.log(`🟩 /api/clipboards/search/+server.ts`);

    // Casting request.url to URL type
    const url = new URL(request.url);

    // Accessing query parameters
    const queryParams = new URLSearchParams(url.searchParams);


    let searchBy: SearchClipboardByType = "title";

    if (queryParams.get('searchBy')) {
        const searchByParam: SearchClipboardByType = queryParams.get('searchBy') as SearchClipboardByType;

        // Check if the value of 'searchByParam' is a valid SearchClipboardByType
        if (validSearchTypes.includes(searchByParam)) {
            searchBy = searchByParam;
        } else {
            // If not valid, return an error
            return json({ error: "searchBy is invalid" });
        }
    }

    // Assuming queryParams.get('searchValue') contains the value to search for
    let searchValue = queryParams.get('searchValue');

    if (typeof searchValue !== "string" || searchValue === "") {
        return json({ error: "searchValue is invalid" });
    }

    if (searchBy === "title" || searchBy === "keywords") {
        // lowercase the searchValue
        searchValue = searchValue.toLowerCase();
    }


    // Constructing the filter string
    const filter = `(${searchBy}~'${searchValue}')`;
    const fields = `id,keywords,title,updated`;

    console.log("🚀 ~ GET ~ filter:", filter)


    let clipboards;

    // as the underlying data
    setHeaders({
        'cache-control': `public, max-age=${15 * 60}`
    });

    try {

        clipboards = await pba.collection('clipboards').getFullList({
            sort: '-updated',
            fields,
            filter
        });

    } catch (error) {
        console.log("🙄 ~ error:", error)
        fail(401, {
            message: 'Something went wrong'
        });
    }

    return json(clipboards);
};
