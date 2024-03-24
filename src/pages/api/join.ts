import type { APIRoute } from "astro";
import { app } from "../../firebase/server";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { serverStudyJoin } from "../../studybuddy";

const auth = getAuth(app);
export const POST: APIRoute = async ({ cookies, request }) => {
    const body = await request.json();
    let user: DecodedIdToken;
    if(cookies.has("session"))
        user = await auth.verifySessionCookie(cookies.get("session").value);
    if(!user || body.group === undefined) return new Response(null, { status: 401 });

    const ok = await serverStudyJoin(user.uid, body.group);
    return new Response(null, { status: ok ? 200 : 400 });
};
