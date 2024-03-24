import type { APIRoute } from "astro";
import { app } from "../../firebase/server";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { StudyBooking, serverStudyBook } from "../../studybuddy";

const auth = getAuth(app);
export const POST: APIRoute = async ({ cookies, request, redirect }) => {
    const body = await request.json();
    let user: DecodedIdToken;
    if(cookies.has("session"))
        user = await auth.verifySessionCookie(cookies.get("session").value);
    if(!user) return new Response(null, { status: 401 });

    const booking = body as StudyBooking;
    console.log(booking);
    await serverStudyBook(user.uid, booking);
    return new Response(null, { status: 200 });
};
