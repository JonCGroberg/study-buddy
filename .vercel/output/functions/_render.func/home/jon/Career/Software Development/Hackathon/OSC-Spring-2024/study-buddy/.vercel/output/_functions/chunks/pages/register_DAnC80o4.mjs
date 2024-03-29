import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, k as addAttribute, e as renderSlot, g as renderComponent } from '../astro_BkfRJKdQ.mjs';
import 'kleur/colors';
import 'html-escaper';
import { c as $$Layout } from './_courses__BlagufxR.mjs';
import 'clsx';

const $$Astro$4 = createAstro();
const $$LoginNav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$LoginNav;
  const { message, linkMessage, linkUrl } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="row justify-content-center align-items-center text-center"> <h2 class="col-auto px-0 pe-1 py-1"> <img src="/image.png" class="img-fluid rounded mx-auto" alt="Image"> </h2> <h2 class="col-auto px-0 ps-1 text-start">StudyBuddies</h2> <p> ${message} <a${addAttribute(linkUrl, "href")}>${linkMessage}</a> </p> </div>`;
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/LoginNav.astro", void 0);

const $$Astro$3 = createAstro();
const $$HeroLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$HeroLayout;
  return renderTemplate`${maybeRenderHead()}<div class="container pt-5"> <div class="row mt-5"> <div class="col-md-6 mx-auto"> ${renderSlot($$result, $$slots["default"])} </div> </div> </div>`;
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/layouts/HeroLayout.astro", void 0);

const $$Astro$2 = createAstro();
const $$FormInput = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FormInput;
  const { inputType } = Astro2.props;
  const type = inputType.toLowerCase();
  const lableText = type[0].toUpperCase() + type.slice(1);
  return renderTemplate`${maybeRenderHead()}<div class="mb-3"> <label for="name" class="form-label"> ${lableText} </label> <input${addAttribute(type, "type")} class="form-control"${addAttribute(type, "id")}${addAttribute(type, "name")}${addAttribute(type, "autocomplete")} required> </div>`;
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/FormInput.astro", void 0);

const $$Astro$1 = createAstro();
const $$Form = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Form;
  const { action, method, buttonMessage, inputs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form${addAttribute(action, "action")}${addAttribute(method, "method")}> ${inputs.map((inputType) => renderTemplate`${renderComponent($$result, "FormInput", $$FormInput, { "inputType": inputType })}`)} <button type="submit" class="btn btn-primary w-100">${buttonMessage}</button> </form>`;
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/Form.astro", void 0);

const $$Astro = createAstro();
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  const title = "Register";
  const [message, linkUrl, linkMessage] = [
    "Already have an account?",
    "/signin",
    "Sign in"
  ];
  const [formAction, formMethod, formInputs] = [
    "../api/auth/register",
    "post",
    ["name", "email", "password"]
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroLayout", $$HeroLayout, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "LoginNav", $$LoginNav, { "message": message, "linkUrl": linkUrl, "linkMessage": linkMessage })} ${renderComponent($$result3, "Form", $$Form, { "action": formAction, "method": formMethod, "buttonMessage": title, "inputs": formInputs })} ` })} ` })}`;
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/register.astro", void 0);

const $$file = "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/register.astro";
const $$url = "/register";

const register = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Register,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$HeroLayout as $, $$LoginNav as a, $$Form as b, register as r };
