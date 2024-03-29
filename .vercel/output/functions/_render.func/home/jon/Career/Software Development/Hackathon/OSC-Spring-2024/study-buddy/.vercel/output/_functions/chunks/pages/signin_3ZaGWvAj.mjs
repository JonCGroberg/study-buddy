import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent } from '../astro_BkfRJKdQ.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as app, c as $$Layout } from './_courses__BlagufxR.mjs';
import { getAuth } from 'firebase-admin/auth';
import { $ as $$HeroLayout, a as $$LoginNav, b as $$Form } from './register_DAnC80o4.mjs';

const $$Astro = createAstro();
const $$Signin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signin;
  const title = "Signin";
  const [message, linkUrl, linkMessage] = [
    "New Here?",
    "/register",
    "Create an account"
  ];
  const [formAction, formMethod, formInputs] = [
    "../api/auth/signin",
    "post",
    ["email", "password"]
  ];
  const auth = getAuth(app);
  if (Astro2.cookies.has("session")) {
    const sessionCookie = Astro2.cookies.get("session").value;
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    if (decodedCookie)
      return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroLayout", $$HeroLayout, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "LoginNav", $$LoginNav, { "message": message, "linkUrl": linkUrl, "linkMessage": linkMessage })} ${renderComponent($$result3, "Form", $$Form, { "action": formAction, "method": formMethod, "buttonMessage": title, "inputs": formInputs })} ` })} ` })} `;
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/signin.astro", void 0);

const $$file = "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/signin.astro";
const $$url = "/signin";

export { $$Signin as default, $$file as file, $$url as url };
