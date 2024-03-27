import type { APIRoute } from "astro";
import { app } from "../../firebase/server";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { type StudyBooking, serverStudyBook } from "../../utils/studybuddy";

const auth = getAuth(app);
export const POST: APIRoute = async ({ cookies, request, redirect }) => {
	const body = await request.json();

	let user: DecodedIdToken;
	if (cookies.has("session"))
		user = await auth.verifySessionCookie(cookies.get("session").value);

	if (!user) return new Response(null, { status: 401 });

	await serverStudyBook(user.uid, body as StudyBooking);
	return new Response(null, { status: 200 });
};
