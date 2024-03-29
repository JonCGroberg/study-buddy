import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_BkfRJKdQ.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as app, b as serverUserStudySearch, $ as $$Nav, S as Search, T as Timeline, c as $$Layout } from './_courses__BlagufxR.mjs';
import { getAuth } from 'firebase-admin/auth';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const auth = getAuth(app);
  let user;
  if (Astro2.cookies.has("session"))
    user = await auth.verifySessionCookie(Astro2.cookies.get("session").value);
  if (!user)
    return Astro2.redirect("/welcome");
  const map = /* @__PURE__ */ new Map();
  const groups = await serverUserStudySearch(user.uid);
  groups.forEach(async (studyGroup) => {
    const truncatedToHours = studyGroup.start / 1e3 - studyGroup.start / 1e3 % 3600;
    if (map.has(truncatedToHours))
      map.set(truncatedToHours, [...map.get(truncatedToHours), studyGroup]);
    else
      map.set(truncatedToHours, [studyGroup]);
  });
  const sortedChunks = [...map.entries()].sort(
    (a, b) => new Date(b[0]).getDate() - new Date(a[0]).getDate()
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-body-secondary pb-5" style="min-height: 100vh;"> ${renderComponent($$result2, "Nav", $$Nav, { "title": "Your Study Groups" })} ${renderComponent($$result2, "Search", Search, { "courses": [], "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/Search", "client:component-export": "default" })} ${renderComponent($$result2, "Timeline", Timeline, { "client:load": true, "studyGroups": sortedChunks, "userId": user.uid, "client:component-hydration": "load", "client:component-path": "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/Timeline", "client:component-export": "default" })} </div> ` })}`;
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/index.astro", void 0);

const $$file = "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
