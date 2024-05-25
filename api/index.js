"use strict";var Z=Object.defineProperty;var je=Object.getOwnPropertyDescriptor;var Ie=Object.getOwnPropertyNames;var Fe=Object.prototype.hasOwnProperty;var qe=(e,t)=>{for(var s in t)Z(e,s,{get:t[s],enumerable:!0})},Ne=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Ie(t))!Fe.call(e,n)&&n!==s&&Z(e,n,{get:()=>t[n],enumerable:!(r=je(t,n))||r.enumerable});return e};var Ue=e=>Ne(Z({},"__esModule",{value:!0}),e);var ct={};qe(ct,{config:()=>at,default:()=>it});module.exports=Ue(ct);var le={Stringify:1,BeforeStream:2,Stream:3},De=(e,t)=>{let s=new String(e);return s.isEscaped=!0,s.callbacks=t,s};var X=async(e,t,s,r,n)=>{let o=e.callbacks;if(!o?.length)return Promise.resolve(e);n?n[0]+=e:n=[e];let i=Promise.all(o.map(c=>c({phase:t,buffer:n,context:r}))).then(c=>Promise.all(c.filter(Boolean).map(a=>X(a,t,!1,r,n))).then(()=>n[0]));return s?De(await i,o):i};var Be="text/plain; charset=UTF-8",W=(e,t={})=>(Object.entries(t).forEach(([s,r])=>e.set(s,r)),e),E=class{req;env={};_var={};finalized=!1;error=void 0;#r=200;#s;#e=void 0;#t=void 0;#n;#o=!0;layout=void 0;renderer=e=>this.html(e);notFoundHandler=()=>new Response;constructor(e,t){this.req=e,t&&(this.#s=t.executionCtx,this.env=t.env,t.notFoundHandler&&(this.notFoundHandler=t.notFoundHandler))}get event(){if(this.#s&&"respondWith"in this.#s)return this.#s;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#s)return this.#s;throw Error("This context has no ExecutionContext")}get res(){return this.#o=!1,this.#n||=new Response("404 Not Found",{status:404})}set res(e){if(this.#o=!1,this.#n&&e){this.#n.headers.delete("content-type");for(let[t,s]of this.#n.headers.entries())if(t==="set-cookie"){let r=this.#n.headers.getSetCookie();e.headers.delete("set-cookie");for(let n of r)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}this.#n=e,this.finalized=!0}render=(...e)=>this.renderer(...e);setLayout=e=>this.layout=e;getLayout=()=>this.layout;setRenderer=e=>{this.renderer=e};header=(e,t,s)=>{if(t===void 0){this.#e?this.#e.delete(e):this.#t&&delete this.#t[e.toLocaleLowerCase()],this.finalized&&this.res.headers.delete(e);return}s?.append?(this.#e||(this.#o=!1,this.#e=new Headers(this.#t),this.#t={}),this.#e.append(e,t)):this.#e?this.#e.set(e,t):(this.#t??={},this.#t[e.toLowerCase()]=t),this.finalized&&(s?.append?this.res.headers.append(e,t):this.res.headers.set(e,t))};status=e=>{this.#o=!1,this.#r=e};set=(e,t)=>{this._var??={},this._var[e]=t};get=e=>this._var?this._var[e]:void 0;get var(){return{...this._var}}newResponse=(e,t,s)=>{if(this.#o&&!s&&!t&&this.#r===200)return new Response(e,{headers:this.#t});if(t&&typeof t!="number"){let n=new Headers(t.headers);this.#e&&this.#e.forEach((i,c)=>{c==="set-cookie"?n.append(c,i):n.set(c,i)});let o=W(n,this.#t);return new Response(e,{headers:o,status:t.status??this.#r})}let r=typeof t=="number"?t:this.#r;this.#t??={},this.#e??=new Headers,W(this.#e,this.#t),this.#n&&(this.#n.headers.forEach((n,o)=>{o==="set-cookie"?this.#e?.append(o,n):this.#e?.set(o,n)}),W(this.#e,this.#t)),s??={};for(let[n,o]of Object.entries(s))if(typeof o=="string")this.#e.set(n,o);else{this.#e.delete(n);for(let i of o)this.#e.append(n,i)}return new Response(e,{status:r,headers:this.#e})};body=(e,t,s)=>typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t);text=(e,t,s)=>{if(!this.#t){if(this.#o&&!s&&!t)return new Response(e);this.#t={}}return this.#t["content-type"]=Be,typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t)};json=(e,t,s)=>{let r=JSON.stringify(e);return this.#t??={},this.#t["content-type"]="application/json; charset=UTF-8",typeof t=="number"?this.newResponse(r,t,s):this.newResponse(r,t)};html=(e,t,s)=>(this.#t??={},this.#t["content-type"]="text/html; charset=UTF-8",typeof e=="object"&&(e instanceof Promise||(e=e.toString()),e instanceof Promise)?e.then(r=>X(r,le.Stringify,!1,{})).then(r=>typeof t=="number"?this.newResponse(r,t,s):this.newResponse(r,t)):typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t));redirect=(e,t=302)=>(this.#e??=new Headers,this.#e.set("Location",e),this.newResponse(null,t));notFound=()=>this.notFoundHandler(this)};var K=(e,t,s)=>(r,n)=>{let o=-1;return i(0);async function i(c){if(c<=o)throw new Error("next() called multiple times");o=c;let a,l=!1,h;if(e[c]?(h=e[c][0][0],r instanceof E&&(r.req.routeIndex=c)):h=c===e.length&&n||void 0,!h)r instanceof E&&r.finalized===!1&&s&&(a=await s(r));else try{a=await h(r,()=>i(c+1))}catch(d){if(d instanceof Error&&r instanceof E&&t)r.error=d,a=await t(d,r),l=!0;else throw d}return a&&(r.finalized===!1||l)&&(r.res=a),r}};var A=class extends Error{res;status;constructor(e=500,t){super(t?.message,{cause:t?.cause}),this.res=t?.res,this.status=e}getResponse(){return this.res?new Response(this.res.body,{status:this.status,headers:this.res.headers}):new Response(this.message,{status:this.status})}};var he=async(e,t={all:!1})=>{let r=(e instanceof C?e.raw.headers:e.headers).get("Content-Type");return r!==null&&r.startsWith("multipart/form-data")||r!==null&&r.startsWith("application/x-www-form-urlencoded")?Ge(e,t):{}};async function Ge(e,t){let s=await e.formData();return s?Ye(s,t):{}}function Ye(e,t){let s={};return e.forEach((r,n)=>{t.all||n.endsWith("[]")?Ze(s,n,r):s[n]=r}),s}var Ze=(e,t,s)=>{let r=e[t];r&&Array.isArray(r)?e[t].push(s):r?e[t]=[r,s]:e[t]=s};var Q=e=>{let t=e.split("/");return t[0]===""&&t.shift(),t},de=e=>{let{groups:t,path:s}=Xe(e),r=Q(s);return We(r,t)},Xe=e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{let n=`@${r}`;return t.push([n,s]),n}),{groups:t,path:e}},We=(e,t)=>{for(let s=t.length-1;s>=0;s--){let[r]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(r)){e[n]=e[n].replace(r,t[s][1]);break}}return e},j={},J=e=>{if(e==="*")return"*";let t=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);return t?(j[e]||(t[2]?j[e]=[e,t[1],new RegExp("^"+t[2]+"$")]:j[e]=[e,t[1],!0]),j[e]):null},ee=e=>{let t=e.url,s=t.indexOf("?",8);return t.slice(t.indexOf("/",8),s===-1?void 0:s)},ue=e=>{let t=e.indexOf("?",8);return t===-1?"":"?"+e.slice(t+1)},pe=e=>{let t=ee(e);return t.length>1&&t[t.length-1]==="/"?t.slice(0,-1):t},$=(...e)=>{let t="",s=!1;for(let r of e)t[t.length-1]==="/"&&(t=t.slice(0,-1),s=!0),r[0]!=="/"&&(r=`/${r}`),r==="/"&&s?t=`${t}/`:r!=="/"&&(t=`${t}${r}`),r==="/"&&t===""&&(t="/");return t},I=e=>{if(!e.match(/\:.+\?$/))return null;let t=e.split("/"),s=[],r="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&r===""?s.push("/"):s.push(r);let o=n.replace("?","");r+="/"+o,s.push(r)}else r+="/"+n}),s.filter((n,o,i)=>i.indexOf(n)===o)},V=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),/%/.test(e)?F(e):e):e,me=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let i=e.indexOf(`?${t}`,8);for(i===-1&&(i=e.indexOf(`&${t}`,8));i!==-1;){let c=e.charCodeAt(i+t.length+1);if(c===61){let a=i+t.length+2,l=e.indexOf("&",a);return V(e.slice(a,l===-1?void 0:l))}else if(c==38||isNaN(c))return"";i=e.indexOf(`&${t}`,i+1)}if(r=/[%+]/.test(e),!r)return}let n={};r??=/[%+]/.test(e);let o=e.indexOf("?",8);for(;o!==-1;){let i=e.indexOf("&",o+1),c=e.indexOf("=",o);c>i&&i!==-1&&(c=-1);let a=e.slice(o+1,c===-1?i===-1?void 0:i:c);if(r&&(a=V(a)),o=i,a==="")continue;let l;c===-1?l="":(l=e.slice(c+1,i===-1?void 0:i),r&&(l=V(l))),s?(n[a]&&Array.isArray(n[a])||(n[a]=[]),n[a].push(l)):n[a]??=l}return t?n[t]:n},fe=me,ge=(e,t)=>me(e,t,!0),F=decodeURIComponent;var C=class{raw;#r;#s;routeIndex=0;path;bodyCache={};constructor(e,t="/",s=[[]]){this.raw=e,this.path=t,this.#s=s,this.#r={}}param(e){return e?this.getDecodedParam(e):this.getAllDecodedParams()}getDecodedParam(e){let t=this.#s[0][this.routeIndex][1][e],s=this.getParamValue(t);return s?/\%/.test(s)?F(s):s:void 0}getAllDecodedParams(){let e={},t=Object.keys(this.#s[0][this.routeIndex][1]);for(let s of t){let r=this.getParamValue(this.#s[0][this.routeIndex][1][s]);r&&typeof r=="string"&&(e[s]=/\%/.test(r)?F(r):r)}return e}getParamValue(e){return this.#s[1]?this.#s[1][e]:e}query(e){return fe(this.url,e)}queries(e){return ge(this.url,e)}header(e){if(e)return this.raw.headers.get(e.toLowerCase())??void 0;let t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){if(this.bodyCache.parsedBody)return this.bodyCache.parsedBody;let t=await he(this,e);return this.bodyCache.parsedBody=t,t}cachedBody=e=>{let{bodyCache:t,raw:s}=this,r=t[e];if(r)return r;if(!t[e]){for(let n of Object.keys(t))if(n!=="parsedBody")return(async()=>{let o=await t[n];return n==="json"&&(o=JSON.stringify(o)),await new Response(o)[e]()})()}return t[e]=s[e]()};json(){return this.cachedBody("json")}text(){return this.cachedBody("text")}arrayBuffer(){return this.cachedBody("arrayBuffer")}blob(){return this.cachedBody("blob")}formData(){return this.cachedBody("formData")}addValidatedData(e,t){this.#r[e]=t}valid(e){return this.#r[e]}get url(){return this.raw.url}get method(){return this.raw.method}get matchedRoutes(){return this.#s[0].map(([[,e]])=>e)}get routePath(){return this.#s[0].map(([[,e]])=>e)[this.routeIndex].path}};var u="ALL",ye="all",we=["get","post","put","delete","options","patch"],q="Can not add a route since the matcher is already built.",N=class extends Error{};var Ke=Symbol("composedHandler");function Ve(){return class{}}var Qe=e=>e.text("404 Not Found",404),xe=(e,t)=>e instanceof A?e.getResponse():(console.error(e),t.text("Internal Server Error",500)),te=class extends Ve(){router;getPath;_basePath="/";#r="/";routes=[];constructor(e={}){super(),[...we,ye].forEach(r=>{this[r]=(n,...o)=>(typeof n=="string"?this.#r=n:this.addRoute(r,this.#r,n),o.forEach(i=>{typeof i!="string"&&this.addRoute(r,this.#r,i)}),this)}),this.on=(r,n,...o)=>{if(!r)return this;for(let i of[n].flat()){this.#r=i;for(let c of[r].flat())o.map(a=>{this.addRoute(c.toUpperCase(),this.#r,a)})}return this},this.use=(r,...n)=>(typeof r=="string"?this.#r=r:(this.#r="*",n.unshift(r)),n.forEach(o=>{this.addRoute(u,this.#r,o)}),this);let s=e.strict??!0;delete e.strict,Object.assign(this,e),this.getPath=s?e.getPath??ee:pe}clone(){let e=new te({router:this.router,getPath:this.getPath});return e.routes=this.routes,e}notFoundHandler=Qe;errorHandler=xe;route(e,t){let s=this.basePath(e);return t?(t.routes.map(r=>{let n;t.errorHandler===xe?n=r.handler:(n=async(o,i)=>(await K([],t.errorHandler)(o,()=>r.handler(o,i))).res,n[Ke]=r.handler),s.addRoute(r.method,r.path,n)}),this):s}basePath(e){let t=this.clone();return t._basePath=$(this._basePath,e),t}onError=e=>(this.errorHandler=e,this);notFound=e=>(this.notFoundHandler=e,this);mount(e,t,s){let r=$(this._basePath,e),n=r==="/"?0:r.length,o=async(i,c)=>{let a;try{a=i.executionCtx}catch{}let l=s?s(i):[i.env,a],h=Array.isArray(l)?l:[l],d=ue(i.req.url),m=await t(new Request(new URL((i.req.path.slice(n)||"/")+d,i.req.url),i.req.raw),...h);if(m)return m;await c()};return this.addRoute(u,$(e,"*"),o),this}addRoute(e,t,s){e=e.toUpperCase(),t=$(this._basePath,t);let r={path:t,method:e,handler:s};this.router.add(e,t,[s,r]),this.routes.push(r)}matchRoute(e,t){return this.router.match(e,t)}handleError(e,t){if(e instanceof Error)return this.errorHandler(e,t);throw e}dispatch(e,t,s,r){if(r==="HEAD")return(async()=>new Response(null,await this.dispatch(e,t,s,"GET")))();let n=this.getPath(e,{env:s}),o=this.matchRoute(r,n),i=new E(new C(e,n,o),{env:s,executionCtx:t,notFoundHandler:this.notFoundHandler});if(o[0].length===1){let a;try{a=o[0][0][0][0](i,async()=>{i.res=await this.notFoundHandler(i)})}catch(l){return this.handleError(l,i)}return a instanceof Promise?a.then(l=>l||(i.finalized?i.res:this.notFoundHandler(i))).catch(l=>this.handleError(l,i)):a}let c=K(o[0],this.errorHandler,this.notFoundHandler);return(async()=>{try{let a=await c(i);if(!a.finalized)throw new Error("Context is not finalized. You may forget returning Response object or `await next()`");return a.res}catch(a){return this.handleError(a,i)}})()}fetch=(e,...t)=>this.dispatch(e,t[1],t[0],e.method);request=(e,t,s,r)=>{if(e instanceof Request)return t!==void 0&&(e=new Request(e,t)),this.fetch(e,s,r);e=e.toString();let n=/^https?:\/\//.test(e)?e:`http://localhost${$("/",e)}`,o=new Request(n,t);return this.fetch(o,s,r)};fire=()=>{addEventListener("fetch",e=>{e.respondWith(this.dispatch(e.request,e,void 0,e.request.method))})}};var U="[^/]+",T=".*",k="(?:|/.*)",M=Symbol(),Je=new Set(".\\+*[^]$()");function et(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===T||e===k?1:t===T||t===k?-1:e===U?1:t===U?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var D=class{index;varIndex;children=Object.create(null);insert(e,t,s,r,n){if(e.length===0){if(this.index!==void 0)throw M;if(n)return;this.index=t;return}let[o,...i]=e,c=o==="*"?i.length===0?["","",T]:["","",U]:o==="/*"?["","",k]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),a;if(c){let l=c[1],h=c[2]||U;if(l&&c[2]&&(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h)))throw M;if(a=this.children[h],!a){if(Object.keys(this.children).some(d=>d!==T&&d!==k))throw M;if(n)return;a=this.children[h]=new D,l!==""&&(a.varIndex=r.varIndex++)}!n&&l!==""&&s.push([l,a.varIndex])}else if(a=this.children[o],!a){if(Object.keys(this.children).some(l=>l.length>1&&l!==T&&l!==k))throw M;if(n)return;a=this.children[o]=new D}a.insert(i,t,s,r,n)}buildRegExpStr(){let t=Object.keys(this.children).sort(et).map(s=>{let r=this.children[s];return(typeof r.varIndex=="number"?`(${s})@${r.varIndex}`:Je.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof this.index=="number"&&t.unshift(`#${this.index}`),t.length===0?"":t.length===1?t[0]:"(?:"+t.join("|")+")"}};var be=class{context={varIndex:0};root=new D;insert(e,t,s){let r=[],n=[];for(let i=0;;){let c=!1;if(e=e.replace(/\{[^}]+\}/g,a=>{let l=`@\\${i}`;return n[i]=[l,a],i++,c=!0,l}),!c)break}let o=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=n.length-1;i>=0;i--){let[c]=n[i];for(let a=o.length-1;a>=0;a--)if(o[a].indexOf(c)!==-1){o[a]=o[a].replace(c,n[i][1]);break}}return this.root.insert(o,t,r,this.context,s),r}buildRegExp(){let e=this.root.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0,s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,o,i)=>typeof o<"u"?(s[++t]=Number(o),"$()"):(typeof i<"u"&&(r[Number(i)]=++t),"")),[new RegExp(`^${e}`),s,r]}};var ve=[],tt=[/^$/,[],Object.create(null)],Re=Object.create(null);function Se(e){return Re[e]??=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`)}function rt(){Re=Object.create(null)}function st(e){let t=new be,s=[];if(e.length===0)return tt;let r=e.map(l=>[!/\*|\/:/.test(l[0]),...l]).sort(([l,h],[d,m])=>l?1:d?-1:h.length-m.length),n=Object.create(null);for(let l=0,h=-1,d=r.length;l<d;l++){let[m,w,p]=r[l];m?n[w]=[p.map(([y])=>[y,Object.create(null)]),ve]:h++;let g;try{g=t.insert(w,h,m)}catch(y){throw y===M?new N(w):y}m||(s[h]=p.map(([y,R])=>{let H=Object.create(null);for(R-=1;R>=0;R--){let[x,z]=g[R];H[x]=z}return[y,H]}))}let[o,i,c]=t.buildRegExp();for(let l=0,h=s.length;l<h;l++)for(let d=0,m=s[l].length;d<m;d++){let w=s[l][d]?.[1];if(!w)continue;let p=Object.keys(w);for(let g=0,y=p.length;g<y;g++)w[p[g]]=c[w[p[g]]]}let a=[];for(let l in i)a[l]=s[i[l]];return[o,a,n]}function P(e,t){if(e){for(let s of Object.keys(e).sort((r,n)=>n.length-r.length))if(Se(s).test(t))return[...e[s]]}}var re=class{name="RegExpRouter";middleware;routes;constructor(){this.middleware={[u]:Object.create(null)},this.routes={[u]:Object.create(null)}}add(e,t,s){let{middleware:r,routes:n}=this;if(!r||!n)throw new Error(q);r[e]||[r,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[u]).forEach(a=>{c[e][a]=[...c[u][a]]})}),t==="/*"&&(t="*");let o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){let c=Se(t);e===u?Object.keys(r).forEach(a=>{r[a][t]||=P(r[a],t)||P(r[u],t)||[]}):r[e][t]||=P(r[e],t)||P(r[u],t)||[],Object.keys(r).forEach(a=>{(e===u||e===a)&&Object.keys(r[a]).forEach(l=>{c.test(l)&&r[a][l].push([s,o])})}),Object.keys(n).forEach(a=>{(e===u||e===a)&&Object.keys(n[a]).forEach(l=>c.test(l)&&n[a][l].push([s,o]))});return}let i=I(t)||[t];for(let c=0,a=i.length;c<a;c++){let l=i[c];Object.keys(n).forEach(h=>{(e===u||e===h)&&(n[h][l]||=[...P(r[h],l)||P(r[u],l)||[]],n[h][l].push([s,o-a+c+1]))})}}match(e,t){rt();let s=this.buildAllMatchers();return this.match=(r,n)=>{let o=s[r]||s[u],i=o[2][n];if(i)return i;let c=n.match(o[0]);if(!c)return[[],ve];let a=c.indexOf("",1);return[o[1][a],c]},this.match(e,t)}buildAllMatchers(){let e=Object.create(null);return[...Object.keys(this.routes),...Object.keys(this.middleware)].forEach(t=>{e[t]||=this.buildMatcher(t)}),this.middleware=this.routes=void 0,e}buildMatcher(e){let t=[],s=e===u;return[this.middleware,this.routes].forEach(r=>{let n=r[e]?Object.keys(r[e]).map(o=>[o,r[e][o]]):[];n.length!==0?(s||=!0,t.push(...n)):e!==u&&t.push(...Object.keys(r[u]).map(o=>[o,r[u][o]]))}),s?st(t):null}};var se=class{name="SmartRouter";routers=[];routes=[];constructor(e){Object.assign(this,e)}add(e,t,s){if(!this.routes)throw new Error(q);this.routes.push([e,t,s])}match(e,t){if(!this.routes)throw new Error("Fatal error");let{routers:s,routes:r}=this,n=s.length,o=0,i;for(;o<n;o++){let c=s[o];try{r.forEach(a=>{c.add(...a)}),i=c.match(e,t)}catch(a){if(a instanceof N)continue;throw a}this.match=c.match.bind(c),this.routers=[c],this.routes=void 0;break}if(o===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(this.routes||this.routers.length!==1)throw new Error("No active router has been determined yet.");return this.routers[0]}};var ne=class{methods;children;patterns;order=0;name;params=Object.create(null);constructor(e,t,s){if(this.children=s||Object.create(null),this.methods=[],this.name="",e&&t){let r=Object.create(null);r[e]={handler:t,possibleKeys:[],score:0,name:this.name},this.methods=[r]}this.patterns=[]}insert(e,t,s){this.name=`${e} ${t}`,this.order=++this.order;let r=this,n=de(t),o=[];for(let a=0,l=n.length;a<l;a++){let h=n[a];if(Object.keys(r.children).includes(h)){r=r.children[h];let m=J(h);m&&o.push(m[1]);continue}r.children[h]=new ne;let d=J(h);d&&(r.patterns.push(d),o.push(d[1])),r=r.children[h]}r.methods.length||(r.methods=[]);let i=Object.create(null),c={handler:s,possibleKeys:o.filter((a,l,h)=>h.indexOf(a)===l),name:this.name,score:this.order};return i[e]=c,r.methods.push(i),r}gHSets(e,t,s,r){let n=[];for(let o=0,i=e.methods.length;o<i;o++){let c=e.methods[o],a=c[t]||c[u],l=Object.create(null);a!==void 0&&(a.params=Object.create(null),a.possibleKeys.forEach(h=>{let d=l[a.name];a.params[h]=r[h]&&!d?r[h]:s[h]??r[h],l[a.name]=!0}),n.push(a))}return n}search(e,t){let s=[];this.params=Object.create(null);let n=[this],o=Q(t);for(let c=0,a=o.length;c<a;c++){let l=o[c],h=c===a-1,d=[];for(let m=0,w=n.length;m<w;m++){let p=n[m],g=p.children[l];g&&(g.params=p.params,h===!0?(g.children["*"]&&s.push(...this.gHSets(g.children["*"],e,p.params,Object.create(null))),s.push(...this.gHSets(g,e,p.params,Object.create(null)))):d.push(g));for(let y=0,R=p.patterns.length;y<R;y++){let H=p.patterns[y],x={...p.params};if(H==="*"){let Y=p.children["*"];Y&&(s.push(...this.gHSets(Y,e,p.params,Object.create(null))),d.push(Y));continue}if(l==="")continue;let[z,ie,O]=H,S=p.children[z],ce=o.slice(c).join("/");if(O instanceof RegExp&&O.test(ce)){x[ie]=ce,s.push(...this.gHSets(S,e,p.params,x));continue}(O===!0||O instanceof RegExp&&O.test(l))&&typeof z=="string"&&(x[ie]=l,h===!0?(s.push(...this.gHSets(S,e,x,p.params)),S.children["*"]&&s.push(...this.gHSets(S.children["*"],e,x,p.params))):(S.params=x,d.push(S)))}}n=d}return[s.sort((c,a)=>c.score-a.score).map(({handler:c,params:a})=>[c,a])]}};var oe=class{name="TrieRouter";node;constructor(){this.node=new ne}add(e,t,s){let r=I(t);if(r){for(let n of r)this.node.insert(e,n,s);return}this.node.insert(e,t,s)}match(e,t){return this.node.search(e,t)}};var b=class extends te{constructor(e={}){super(e),this.router=e.router??new se({routers:[new re,new oe]})}};var Ee=e=>{e.onError((t,s)=>{if(t instanceof A){s.status(t.status);let r=t.res?.headers;return s.json({error:t.message||t.res?.statusText},t.status,r?Object.fromEntries(r):{})}return console.error(`${t}`),s.json({error:`Error Occur ${t}`},500)}),e.notFound(t=>t.json({error:`Not Found ${t.req.raw.url}`},404))};var $e=()=>{let e=globalThis;return e?.Deno!==void 0?"deno":e?.Bun!==void 0?"bun":typeof e?.WebSocketPair=="function"?"workerd":typeof e?.EdgeRuntime=="string"?"edge-light":e?.fastly!==void 0?"fastly":e?.process?.release?.name==="node"?"node":"other"};var nt=e=>{let t=new URL(e);return{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",Origin:t.host,Referer:t.origin,Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","Accept-Encoding":"gzip, deflate, br","Accept-Language":"en-US,en;q=0.9","Cache-Control":"no-cache",Pragma:"no-cache",Connection:"keep-alive","Upgrade-Insecure-Requests":"1"}},v=async(e,t,s=8e3)=>{let n=0,o={...nt(e),...t?.headers};for(console.log(`[customFetch] ${e} Fetching data...`);n<3;)try{let i=await Promise.race([fetch(e,{...t,headers:o}),new Promise((c,a)=>setTimeout(()=>a("TIMEOUT"),s))]);if(i)return i;n++}catch(i){console.error(`[customFetch] ${e} Failed to fetch data: ${i} and retrying...`),n++}throw new Error(`[customFetch] ${e} Failed to fetch data after ${n} retries`)},Me=async(e,t)=>{await t(),console.log("[delHeaderLengthMiddleware] Deleting Content-Length header..."),e.res.headers.delete("content-length"),e.res.headers.delete("content-encoding")};var B=new b;B.get("/ping",e=>e.text("pong",200));B.get("/runtime",e=>e.json({runtime:$e()}));B.all("/proxy/:url{.*?}",Me,async e=>{let t=e.req.param("url");console.log(`[defaultRoute] Fetching data from ${t}...`);let s=await v(t,{headers:e.req.raw.headers,method:e.req.method});return e.newResponse(s.body,s.status,Object.fromEntries(s.headers))});var Pe=B;var He=e=>{if(!globalThis.caches)return console.log("Cache Middleware is not enabled because caches is not defined."),async(n,o)=>await o();e.wait===void 0&&(e.wait=!1);let t=e.cacheControl?.split(",").map(n=>n.toLowerCase()),s=Array.isArray(e.vary)?e.vary:e.vary?.split(",").map(n=>n.trim());if(e.vary?.includes("*"))throw new Error('Middleware vary configuration cannot include "*", as it disallows effective caching.');let r=n=>{if(t){let o=n.res.headers.get("Cache-Control")?.split(",").map(i=>i.trim().split("=",1)[0])??[];for(let i of t){let[c,a]=i.trim().split("=",2);c=c.toLowerCase(),o.includes(c)||n.header("Cache-Control",`${c}${a?`=${a}`:""}`,{append:!0})}}if(s){let o=n.res.headers.get("Vary")?.split(",").map(c=>c.trim())??[],i=Array.from(new Set([...o,...s].map(c=>c.toLowerCase()))).sort();i.includes("*")?n.header("Vary","*"):n.header("Vary",i.join(", "))}};return async function(o,i){let c=o.req.url;e.keyGenerator&&(c=await e.keyGenerator(o));let a=typeof e.cacheName=="function"?await e.cacheName(o):e.cacheName,l=await caches.open(a),h=await l.match(c);if(h)return new Response(h.body,h);if(await i(),!o.res.ok)return;r(o);let d=o.res.clone();e.wait?await l.put(c,d):o.executionCtx.waitUntil(l.put(c,d))}};var f=(e,t,s)=>e.replace("${"+t+"}",s),Oe=async(e,t)=>{let s=e;s=f(s,"x",t.x),s=f(s,"y",t.y),s=f(s,"z",t.z),s=f(s,"serverpart",Math.floor(Math.random()*4).toString()),console.log(`[defaultMapHandler] reqURL: ${s}`);let r=await v(s);return new Response(r.body,{status:r.status,statusText:r.statusText,headers:r.headers})};var Te=async(e,t)=>{let s=e;s=f(s,"x",t.x),s=f(s,"y",t.y),s=f(s,"z",t.z),s=f(s,"serverpart",["a","b","c"][Math.floor(Math.random()*3)]),console.log(`[OSMTansportMapHandler] reqURL: ${s}`);let r=await v(s);return new Response(r.body,{status:r.status,statusText:r.statusText,headers:r.headers})},L=e=>async(s,r)=>{let n=s;n=f(n,"x",r.x),n=f(n,"y",r.y),n=f(n,"z",r.z),n=f(n,"serverpart",Math.floor(Math.random()*4).toString()),console.log(`[RefererMapHandle] reqURL: ${n}`);let o=await v(n,{headers:{Referer:e}});return new Response(o.body,{status:o.status,statusText:o.statusText,headers:o.headers})},ke=e=>async(s,r)=>{let n=s;n=f(n,"x",r.x),n=f(n,"y",r.y),n=f(n,"z",r.z),n=f(n,"serverpart",Math.floor(Math.random()*4).toString()),console.log(`[CustomHeader] reqURL: ${n}`);let o=await v(n,{headers:{...e}});return new Response(o.body,{status:o.status,statusText:o.statusText,headers:o.headers})};var G=[{name:"Google Satellite Old",type:"gso",url:"https://www.google.com/maps/vt?lyrs=s@189&x=${x}&y=${y}&z=${z}"},{name:"Google Satellite New",type:"gs",url:"https://khms${serverpart}.google.com/kh/v=979?x=${x}&y=${y}&z=${z}"},{name:"Google Map",type:"gm",url:"https://mt${serverpart}.google.com/vt/lyrs=r&x=${x}&y=${y}&z=${z}"},{name:"Google Satellite Hybrid",type:"gsh",url:"https://mt${serverpart}.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}"},{name:"Google Terrain Hybrid",type:"gt",url:"https://www.google.com/maps/vt/pb=!1m4!1m3!1i${z}!2i${x}!3i${y}!2m2!1e5!2sshading!2m2!1e6!2scontours!2m3!1e0!2sm!3i693438634!3m7!5e1105!12m1!1e67!12m1!1e63!12m1!1e3!4e0!5f1.25!6b1"},{name:"Google Rouds",type:"gr",url:"https://mt${serverpart}.google.com/vt/lyrs=h&x=${x}&y=${y}&z=${z}"},{name:"Openstreetmap Standard",type:"osms",url:"https://tile.openstreetmap.org/${z}/${x}/${y}.png",handler:L("https://map.gov.cn")},{name:"Openstreetmap Public GPS trace",type:"osmgps",url:"https://gps.tile.openstreetmap.org/lines/${z}/${x}/${y}.png"},{name:"TraceStrack Topo Map",type:"ttm",url:"https://tile.tracestrack.com/topo__/${z}/${x}/${y}.png?key=383118983d4a867dd2d367451720d724",handler:L("https://www.openstreetmap.org/")},{name:"OpenStreetMap Transport",type:"osmtsp",url:"https://${serverpart}.tile.thunderforest.com/transport/${z}/${x}/${y}.png?apikey=6e5478c8a4f54c779f85573c0e399391",handler:Te},{name:"FlightRadar64 Google Map 512x",type:"frgm",url:"https://maps.google.com/maps/vt?pb=!1m5!1m4!1i${z}!2i${x}!3i${y}!4i256!2m3!1e4!2st!3i693!2m3!1e0!2sr!3i693439057!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjMzfHMuZTpsfHAudjpvZmY!4e0!5m1!5f2&client=gme-flightradar24ab1&token=10424"},{name:"FlightRadar64 Google Satellite",type:"frgs",url:"https://khms${serverpart}.googleapis.com/kh?v=979&hl=en&x=${x}&y=${y}&z=${z}"},{name:"Maritime Map www.shipfinder.com",type:"maritime_shipfinder",url:"https://m12.shipxy.com/tile.c?l=En&m=F&x=${x}&y=${y}&z=${z}"},{name:"Maritime Map webapp.navionics.com",type:"maritime_navionics",url:"https://backend.navionics.com/tile/${z}/${x}/${y}?LAYERS=config_1_20.00_0&TRANSPARENT=FALSE&UGC=TRUE&theme=0&navtoken=eyJrZXkiOiJOQVZJT05JQ1NfV0VCQVBQX1AwMSIsImtleURvbWFpbiI6IndlYmFwcC5uYXZpb25pY3MuY29tIiwicmVmZXJlciI6IndlYmFwcC5uYXZpb25pY3MuY29tIiwicmFuZG9tIjoxNzE2MzQ4MDUzMzk2fQ",handler:L("https://webapp.navionics.com/")},{name:"Arcgis Satelite",type:"arcgis_satelite",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}"},{name:"Map here satelite maps.here.com",type:"mh_satelite",url:"https://maps.hereapi.com/v3/background/mc/${z}/${x}/${y}/jpeg?xnlp=CL_JSMv3.1.53.0&apikey=cPzg70fN-9K-pQtvdvCZErZu-VZLEocbLVEOOq2sVaQ&style=satellite.day&ppi=400&size=256&lang=en&lang2=en",handler:L("https://maps.here.com/")},{name:"Test Router",type:"t",url:"https://cip.cc/",handler:ke({"User-Agent":"curl/7.68.0"})}];var Le=new b;Le.get("/:type/:x{[0-9]+}/:y{[0-9]+}/:z{[0-9]+}",He({cacheName:"map",keyGenerator:e=>e.req.url,cacheControl:"max-age=3600",wait:!1}),async e=>{let{type:t,x:s,y:r,z:n}=e.req.param(),o=G.find(a=>a.type===t);return o?await(o.handler||Oe)(o.url,{type:t,x:s,y:r,z:n}):e.json({error:`Map type ${t} not found!`},404)});var _e=Le;var ot=`
	<!doctype html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Tile Map Proxy</title>
		</head>
		<body>
			<div class="container">
				<h1 class="title">Tile Map Proxy</h1>
				<p class="description">
					A Tile Map Proxy base on NodeJS Edge runtime. Provide a unified API that uses Google XYZ tile coordinates<br />
					It can be imported into the map browser as a custom map source. Ovital, ACGIS etc. <br />
					Feature: <br />
					1. Resolve and optimize the tile map loading network. With the power of CloudFlare global CDN and cache.<br />
					2. Help people(Chinese) that after the GFW to access the world map service(Google etc.). <br />
					3. Smooth out the differences between each Tile API and provide Google XYZ-based Tile APIs in a unified format. <br />
					4. Provides a custom **hander** interface to handle possible limitations of some APIs. e.g. CORS/Header Referer/Cookie etc.<br />
				</p>

				<h2>Usage:</h2>
				<form class="preview_params">
					Preview Parameter X: <input type="text" name="x" /> Y: <input type="text" name="y" /> Z: <input type="text" name="z" />
					<button onclick="clearXYZFromLocalStorage()">Clear cache</button>
				</form>
				<div class="div_list">{{%items%}}</div>
			</div>
		</body>
		<style>
			.preview_params input {
				width: 4rem;
				height: 1rem;
				font-size: 16px;
				margin: 0.3rem;
				padding: 0.3rem;
				background-color: #f0f0f0;
				border-radius: 10px;
			}
			img {
				max-width: 100%;
				max-height: 100%;
			}
			button {
				padding: 0.5rem;
				background-color: #f0f0f0;
				border: 1px solid #f0f0f0;
				border-radius: 5px;
				cursor: pointer;
			}
			button:hover {
				background-color: #b8b3b3;
			}
			body,
			h1,
			h2,
			h3,
			p {
				margin: 0;
				padding: 0;
			}
			html {
				background-color: beige;
				font-size: 16px;
			}

			.div_item {
				margin: 0.3rem;
				padding: 0.3rem;
				background-color: #f0f0f0;
				border-radius: 10px;
			}
			.div_item .link {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 0.3rem;
				margin-bottom: 0.3rem;
				padding: 0.3rem;
				background-color: azure;
				border-radius: 10px;
				color: gray;
			}
			.div_item span {
				overflow: auto;
				white-space: nowrap;
			}
			.div_item .source_url {
				overflow: auto;
				white-space: nowrap;
				background: yellow;
			}

			.div_item .preview {
				margin-top: 0.3rem;
				padding: 0.3rem;
				text-align: center;
			}

			.container {
				margin-left: auto;
				margin-right: auto;
				width: 100vw;
				background-color: bisque;
				box-sizing: border-box;
				padding: 1rem;
				border-radius: 10px;
			}

			@media (min-width: 780px) {
				.container {
					max-width: 80vw;
				}
			}

			.title {
				text-align: center;
				color: blueviolet;
			}

			.description {
				color: #333;
				word-wrap: break-word;
				overflow-wrap: break-word;
				background: paleturquoise;
				padding: 1rem;
				border-style: dashed;
				border-radius: 25px;
			}

			body {
				--sb-track-color: #232e33;
				--sb-thumb-color: #6baf8d;
				--sb-size: 10px;

				scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
			}

			body::-webkit-scrollbar {
				width: var(--sb-size);
			}

			body::-webkit-scrollbar-track {
				background: var(--sb-track-color);
				border-radius: 10px;
			}

			body::-webkit-scrollbar-thumb {
				background: var(--sb-thumb-color);
				border-radius: 10px;
			}
		</style>
		<script>
			const CoordinatesKey = 'coordinates'

			function handleCopy(event) {
				const text = event.target.parentElement.querySelector('span').innerText
				navigator.clipboard.writeText(text).then(
					() => {
						alert('Copied to clipboard')
					},
					(err) => {
						console.error('Failed to copy: ', err)
					},
				)
			}

			function readXYZFromInput() {
				const x = document.querySelector('.preview_params input[name="x"]').value
				const y = document.querySelector('.preview_params input[name="y"]').value
				const z = document.querySelector('.preview_params input[name="z"]').value
				return { x, y, z }
			}
			function saveXYZtoLoaclStorage() {
				let { x, y, z } = readXYZFromInput()
				if (x === '' || y === '' || z === '') {
					return
				}
				localStorage.setItem(CoordinatesKey, JSON.stringify({ x, y, z }))
			}
			function loadXYZFromLocalStorage() {
				let { x, y, z } = JSON.parse(localStorage.getItem(CoordinatesKey)) || { x: '', y: '', z: '' }
				document.querySelector('.preview_params input[name="x"]').value = x
				document.querySelector('.preview_params input[name="y"]').value = y
				document.querySelector('.preview_params input[name="z"]').value = z
			}

			function clearXYZFromLocalStorage() {
				localStorage.removeItem(CoordinatesKey)
			}

			onload = () => {
				loadXYZFromLocalStorage()
				changePreview()
			}

			function changePreview() {
				let { x, y, z } = readXYZFromInput()

				console.log(\`Input x: \${x}, y: \${y}, z: \${z}\`)
				if (x === '' || y === '' || z === '') {
					return
				}
				saveXYZtoLoaclStorage()
				const imgs = document.querySelectorAll('.div_item .preview img')
				for (let i = 0; i < imgs.length; i++) {
					let originSrc = imgs[i].src
					let mainSrc = originSrc.split('/').slice(0, 5).join('/')
					let newSrc = mainSrc + \`/\${x}/\${y}/\${z}\`
					console.log(\`Change src: \${originSrc} to \${newSrc}\`)
					imgs[i].src = newSrc
				}
			}
			document.querySelector('.preview_params').addEventListener('input', changePreview)
		</script>
	</html>
`,ze=(e,t)=>{let s="";return e.forEach(r=>{s+=`
        <div class="div_item">
            <h3>${r.name} -- ${r.type}</h3>
            <div class="link">
                <span>${t}/map/${r.type}/{$x}/{$y}/{$z}</span>
                <button onclick="handleCopy(event)">copy</button>
            </div>
			Source: <p class="source_url">${r.url}</p>
            <div class="preview">
                <p>Preview:</p>
                <img src="${t}/map/${r.type}/1/1/1" alt="${r.name}" />
            </div>
        </div>
        `}),s},Ae=(e,t)=>ot.replace(`{{%${e}%}}`,t);var _=new b({strict:!1});_.get("/",e=>{let s=new URL(e.req.url).origin;return e.html(Ae("items",ze(G,s)))});Ee(_);_.route("/",Pe);_.route("/map",_e);var Ce=_;var ae=e=>(t,s)=>e.fetch(t,{},s);var at={runtime:"edge"},it=ae(Ce);0&&(module.exports={config});
