import { getAuth } from 'firebase-admin/auth';
import { a as app } from './_courses__BlagufxR.mjs';

const POST = async ({ request, redirect }) => {
  const auth = getAuth(app);
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  if (!email || !password || !name) {
    return new Response(
      "Missing form data",
      { status: 400 }
    );
  }
  try {
    await auth.createUser({
      email,
      password,
      displayName: name
    });
  } catch (error) {
    return new Response(
      "Something went wrong",
      { status: 400 }
    );
  }
  return redirect("/signin");
};

export { POST };
