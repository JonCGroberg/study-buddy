import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, request, redirect }) => {
    return new Response(null, { status: 400 });
};
