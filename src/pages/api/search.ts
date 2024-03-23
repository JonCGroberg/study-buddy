import type { APIRoute } from "astro";
import { serverStudySearch } from "../../studybuddy";

// {course:course_title}
export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get("Content-Type") === "application/json") {
		const body = await request.json();
		if (body.course === undefined || typeof body.course !== "string")
			return new Response(null, { status: 400 });

		const groups = await serverStudySearch(
			(body.course as string).toUpperCase()
		);
		return new Response(JSON.stringify(groups), { status: 200 });
	}
	return new Response(null, { status: 400 });
};
