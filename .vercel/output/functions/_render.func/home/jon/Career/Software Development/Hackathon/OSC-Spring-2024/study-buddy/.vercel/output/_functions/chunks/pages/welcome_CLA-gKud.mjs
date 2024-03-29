import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_BkfRJKdQ.mjs';
import 'kleur/colors';
import 'html-escaper';
import { c as $$Layout } from './_courses__BlagufxR.mjs';
import { $ as $$HeroLayout } from './register_DAnC80o4.mjs';

const $$Astro = createAstro();
const $$Welcome = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Welcome;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroLayout", $$HeroLayout, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="text-center"> <img src="/image.png" class="img-fluid rounded mx-auto" alt="Image"> <h4 class="mt-3 mx-auto fw-bold">
Find study groups easily and quickly with StudyBuddies
</h4> <h5 class="mt-3 mx-auto">
Sign up to get started, or log in if you have an account!
</h5> </div> <div class="py-4"> <a href="/signin" class="btn btn-primary rounded-3 w-100">Sign In</a> <a href="/register" class="btn btn-outline-secondary rounded-3 mt-3 w-100">Register</a> </div> ` })} ` })}`;
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/welcome.astro", void 0);

const $$file = "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/welcome.astro";
const $$url = "/welcome";

export { $$Welcome as default, $$file as file, $$url as url };
