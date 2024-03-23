import type { APIRoute } from "astro";
import { serverStudySearch } from "../../studybuddy";

export const POST: APIRoute = async ({ request }) => {
    if(request.headers.get("Content-Type") === "application/json") {
        const body = await request.json();
        if(body.course !== undefined && typeof body.course === "string") {
            const groups = await serverStudySearch((body.course as string).toUpperCase());
            return new Response(JSON.stringify(groups), { status: 200 });
        } else if(body.owner !== undefined && typeof body.owner === "string") {
            // TODO: search by owner
        }
    }
    return new Response(null, { status: 400 });
};
