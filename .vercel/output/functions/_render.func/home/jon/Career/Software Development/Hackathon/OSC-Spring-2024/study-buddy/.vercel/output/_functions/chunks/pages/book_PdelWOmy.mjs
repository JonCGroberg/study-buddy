import { a as app, s as serverStudyBook } from './_courses__BlagufxR.mjs';
import { getAuth } from 'firebase-admin/auth';

const auth = getAuth(app);
const POST = async ({ cookies, request, redirect }) => {
  const body = await request.json();
  let user;
  if (cookies.has("session"))
    user = await auth.verifySessionCookie(cookies.get("session").value);
  if (!user)
    return new Response(null, { status: 401 });
  await serverStudyBook(user.uid, body);
  return new Response(null, { status: 200 });
};

export { POST };
