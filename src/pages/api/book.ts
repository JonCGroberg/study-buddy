import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
    return new Response(null, { status: 400 });
};
