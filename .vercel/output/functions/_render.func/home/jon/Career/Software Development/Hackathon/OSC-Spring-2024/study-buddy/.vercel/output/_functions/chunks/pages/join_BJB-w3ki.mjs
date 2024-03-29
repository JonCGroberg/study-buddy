import { a as app, d as serverStudyJoin } from './_courses__BlagufxR.mjs';
import { getAuth } from 'firebase-admin/auth';

const auth = getAuth(app);
const POST = async ({ cookies, request }) => {
  const body = await request.json();
  let user;
  if (cookies.has("session"))
    user = await auth.verifySessionCookie(cookies.get("session").value);
  if (!user || body.group === void 0)
    return new Response(null, { status: 401 });
  const ok = await serverStudyJoin(user.uid, body.group);
  return new Response(null, { status: ok ? 200 : 400 });
};

export { POST };
