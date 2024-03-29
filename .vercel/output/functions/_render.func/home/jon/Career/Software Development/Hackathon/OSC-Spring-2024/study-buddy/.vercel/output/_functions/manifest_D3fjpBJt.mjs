import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_BkfRJKdQ.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/register.ts","pathname":"/api/auth/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signin.ts","pathname":"/api/auth/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signout.ts","pathname":"/api/auth/signout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/book","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/book\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"book","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/book.ts","pathname":"/api/book","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/join","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/join\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"join","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/join.ts","pathname":"/api/join","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/leave","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/leave\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"leave","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/leave.ts","pathname":"/api/leave","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BdgDpQtN.js"}],"styles":[{"type":"inline","content":".text-primary{color:#0317ab!important}.btn-primary{background:#0316ab!important}.btn-outline-primary{border-color:#0317ab!important;color:#0317ab!important}.btn-outline-primary:hover{border-color:#0317ab!important;background:#0317ab!important;color:#fff!important}.btn,.card{border-radius:4px!important}.btn-width{min-width:200px}\n"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BdgDpQtN.js"}],"styles":[{"type":"inline","content":".text-primary{color:#0317ab!important}.btn-primary{background:#0316ab!important}.btn-outline-primary{border-color:#0317ab!important;color:#0317ab!important}.btn-outline-primary:hover{border-color:#0317ab!important;background:#0317ab!important;color:#fff!important}.btn,.card{border-radius:4px!important}.btn-width{min-width:200px}\n.text-primary{color:#0317ab!important}.btn-primary{background:#0316ab!important}.btn-outline-primary{border-color:#0317ab!important;color:#0317ab!important}.btn-outline-primary:hover{border-color:#0317ab!important;background:#0317ab!important;color:#fff!important}.btn,.card{border-radius:4px!important}.btn-width{min-width:200px}\n"}],"routeData":{"route":"/search/[courses]","isIndex":false,"type":"page","pattern":"^\\/search\\/([^/]+?)\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}],[{"content":"courses","dynamic":true,"spread":false}]],"params":["courses"],"component":"src/pages/search/[courses].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D2Vl0t6r.js"}],"styles":[{"type":"inline","content":".text-primary{color:#0317ab!important}.btn-primary{background:#0316ab!important}.btn-outline-primary{border-color:#0317ab!important;color:#0317ab!important}.btn-outline-primary:hover{border-color:#0317ab!important;background:#0317ab!important;color:#fff!important}.btn,.card{border-radius:4px!important}.btn-width{min-width:200px}\n"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BdgDpQtN.js"}],"styles":[{"type":"inline","content":".text-primary{color:#0317ab!important}.btn-primary{background:#0316ab!important}.btn-outline-primary{border-color:#0317ab!important;color:#0317ab!important}.btn-outline-primary:hover{border-color:#0317ab!important;background:#0317ab!important;color:#fff!important}.btn,.card{border-radius:4px!important}.btn-width{min-width:200px}\n"}],"routeData":{"route":"/welcome","isIndex":false,"type":"page","pattern":"^\\/welcome\\/?$","segments":[[{"content":"welcome","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/welcome.astro","pathname":"/welcome","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BdgDpQtN.js"}],"styles":[{"type":"inline","content":".text-primary{color:#0317ab!important}.btn-primary{background:#0316ab!important}.btn-outline-primary{border-color:#0317ab!important;color:#0317ab!important}.btn-outline-primary:hover{border-color:#0317ab!important;background:#0317ab!important;color:#fff!important}.btn,.card{border-radius:4px!important}.btn-width{min-width:200px}\n.text-primary{color:#0317ab!important}.btn-primary{background:#0316ab!important}.btn-outline-primary{border-color:#0317ab!important;color:#0317ab!important}.btn-outline-primary:hover{border-color:#0317ab!important;background:#0317ab!important;color:#fff!important}.btn,.card{border-radius:4px!important}.btn-width{min-width:200px}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/register.astro",{"propagation":"none","containsHead":true}],["/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/search/[courses].astro",{"propagation":"none","containsHead":true}],["/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/signin.astro",{"propagation":"none","containsHead":true}],["/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/welcome.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/api/book.ts":"chunks/pages/book_PdelWOmy.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_B6YpFXXX.mjs","/src/pages/index.astro":"chunks/pages/index_DTkznIz0.mjs","/src/pages/api/join.ts":"chunks/pages/join_BJB-w3ki.mjs","/src/pages/api/leave.ts":"chunks/pages/leave_DCFgywmB.mjs","/src/pages/api/auth/register.ts":"chunks/pages/register_CweYycGe.mjs","/src/pages/signin.astro":"chunks/pages/signin_3ZaGWvAj.mjs","/src/pages/api/auth/signin.ts":"chunks/pages/signin_B5u9VnHc.mjs","/src/pages/api/auth/signout.ts":"chunks/pages/signout_TKOKTusz.mjs","/src/pages/welcome.astro":"chunks/pages/welcome_CLA-gKud.mjs","\u0000@astrojs-manifest":"manifest_D3fjpBJt.mjs","/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_5UR7MlAw.mjs","\u0000@astro-page:src/pages/api/auth/register@_@ts":"chunks/register_D-F8hBkk.mjs","\u0000@astro-page:src/pages/api/auth/signin@_@ts":"chunks/signin_CKmGKoX9.mjs","\u0000@astro-page:src/pages/api/auth/signout@_@ts":"chunks/signout_WnCMamIO.mjs","\u0000@astro-page:src/pages/api/book@_@ts":"chunks/book_5cgMfo8l.mjs","\u0000@astro-page:src/pages/api/join@_@ts":"chunks/join_DzWprX5C.mjs","\u0000@astro-page:src/pages/api/leave@_@ts":"chunks/leave_CWWABc7G.mjs","\u0000@astro-page:src/pages/register@_@astro":"chunks/register_cG9FxikT.mjs","\u0000@astro-page:src/pages/search/[courses]@_@astro":"chunks/_courses__B00l9nzp.mjs","\u0000@astro-page:src/pages/signin@_@astro":"chunks/signin_203NH8JF.mjs","\u0000@astro-page:src/pages/welcome@_@astro":"chunks/welcome_B4aeva_7.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_BJTLeWpp.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.BdgDpQtN.js","/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/Search":"_astro/Search.D-ZDHOoO.js","/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/Timeline":"_astro/Timeline.B3xrM1e4.js","/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/BookingModal":"_astro/BookingModal.CyFIAtSg.js","@astrojs/react/client.js":"_astro/client.DbokQZWz.js","/astro/hoisted.js?q=0":"_astro/hoisted.D2Vl0t6r.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/courses.json","/icon.ico","/image.png","/_astro/BookingModal.CyFIAtSg.js","/_astro/Search.D-ZDHOoO.js","/_astro/Timeline.B3xrM1e4.js","/_astro/client.DbokQZWz.js","/_astro/color.Cly4xzeD.js","/_astro/hoisted.BdgDpQtN.js","/_astro/hoisted.D2Vl0t6r.js","/_astro/index.NEDEFKed.js","/_astro/jsx-runtime.K1e75nIr.js","/_astro/time.DtebfkEO.js"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
