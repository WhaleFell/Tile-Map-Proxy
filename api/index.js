
export const config = {
	supportsResponseStreaming: true,
	api: {
		badyParse: false,
	},
}
export const dynamic = 'force-dynamic'

var Ee={Stringify:1,BeforeStream:2,Stream:3},at=(e,t)=>{let s=new String(e);return s.isEscaped=!0,s.callbacks=t,s};var te=async(e,t,s,r,n)=>{let o=e.callbacks;if(!o?.length)return Promise.resolve(e);n?n[0]+=e:n=[e];let a=Promise.all(o.map(c=>c({phase:t,buffer:n,context:r}))).then(c=>Promise.all(c.filter(Boolean).map(i=>te(i,t,!1,r,n))).then(()=>n[0]));return s?at(await a,o):a};var it="text/plain; charset=UTF-8",re=(e,t={})=>(Object.entries(t).forEach(([s,r])=>e.set(s,r)),e),H=class{req;env={};_var={};finalized=!1;error=void 0;#t=200;#e;#r=void 0;#s=void 0;#n;#o=!0;layout=void 0;renderer=e=>this.html(e);notFoundHandler=()=>new Response;constructor(e,t){this.req=e,t&&(this.#e=t.executionCtx,this.env=t.env,t.notFoundHandler&&(this.notFoundHandler=t.notFoundHandler))}get event(){if(this.#e&&"respondWith"in this.#e)return this.#e;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#e)return this.#e;throw Error("This context has no ExecutionContext")}get res(){return this.#o=!1,this.#n||=new Response("404 Not Found",{status:404})}set res(e){if(this.#o=!1,this.#n&&e){this.#n.headers.delete("content-type");for(let[t,s]of this.#n.headers.entries())if(t==="set-cookie"){let r=this.#n.headers.getSetCookie();e.headers.delete("set-cookie");for(let n of r)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}this.#n=e,this.finalized=!0}render=(...e)=>this.renderer(...e);setLayout=e=>this.layout=e;getLayout=()=>this.layout;setRenderer=e=>{this.renderer=e};header=(e,t,s)=>{if(t===void 0){this.#r?this.#r.delete(e):this.#s&&delete this.#s[e.toLocaleLowerCase()],this.finalized&&this.res.headers.delete(e);return}s?.append?(this.#r||(this.#o=!1,this.#r=new Headers(this.#s),this.#s={}),this.#r.append(e,t)):this.#r?this.#r.set(e,t):(this.#s??={},this.#s[e.toLowerCase()]=t),this.finalized&&(s?.append?this.res.headers.append(e,t):this.res.headers.set(e,t))};status=e=>{this.#o=!1,this.#t=e};set=(e,t)=>{this._var??={},this._var[e]=t};get=e=>this._var?this._var[e]:void 0;get var(){return{...this._var}}newResponse=(e,t,s)=>{if(this.#o&&!s&&!t&&this.#t===200)return new Response(e,{headers:this.#s});if(t&&typeof t!="number"){let n=new Headers(t.headers);this.#r&&this.#r.forEach((a,c)=>{c==="set-cookie"?n.append(c,a):n.set(c,a)});let o=re(n,this.#s);return new Response(e,{headers:o,status:t.status??this.#t})}let r=typeof t=="number"?t:this.#t;this.#s??={},this.#r??=new Headers,re(this.#r,this.#s),this.#n&&(this.#n.headers.forEach((n,o)=>{o==="set-cookie"?this.#r?.append(o,n):this.#r?.set(o,n)}),re(this.#r,this.#s)),s??={};for(let[n,o]of Object.entries(s))if(typeof o=="string")this.#r.set(n,o);else{this.#r.delete(n);for(let a of o)this.#r.append(n,a)}return new Response(e,{status:r,headers:this.#r})};body=(e,t,s)=>typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t);text=(e,t,s)=>{if(!this.#s){if(this.#o&&!s&&!t)return new Response(e);this.#s={}}return this.#s["content-type"]=it,typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t)};json=(e,t,s)=>{let r=JSON.stringify(e);return this.#s??={},this.#s["content-type"]="application/json; charset=UTF-8",typeof t=="number"?this.newResponse(r,t,s):this.newResponse(r,t)};html=(e,t,s)=>(this.#s??={},this.#s["content-type"]="text/html; charset=UTF-8",typeof e=="object"&&(e instanceof Promise||(e=e.toString()),e instanceof Promise)?e.then(r=>te(r,Ee.Stringify,!1,{})).then(r=>typeof t=="number"?this.newResponse(r,t,s):this.newResponse(r,t)):typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t));redirect=(e,t=302)=>(this.#r??=new Headers,this.#r.set("Location",e),this.newResponse(null,t));notFound=()=>this.notFoundHandler(this)};var se=(e,t,s)=>(r,n)=>{let o=-1;return a(0);async function a(c){if(c<=o)throw new Error("next() called multiple times");o=c;let i,l=!1,h;if(e[c]?(h=e[c][0][0],r instanceof H&&(r.req.routeIndex=c)):h=c===e.length&&n||void 0,!h)r instanceof H&&r.finalized===!1&&s&&(i=await s(r));else try{i=await h(r,()=>a(c+1))}catch(d){if(d instanceof Error&&r instanceof H&&t)r.error=d,i=await t(d,r),l=!0;else throw d}return i&&(r.finalized===!1||l)&&(r.res=i),r}};var x=class extends Error{res;status;constructor(e=500,t){super(t?.message,{cause:t?.cause}),this.res=t?.res,this.status=e}getResponse(){return this.res?new Response(this.res.body,{status:this.status,headers:this.res.headers}):new Response(this.message,{status:this.status})}};var He=async(e,t={all:!1})=>{let r=(e instanceof D?e.raw.headers:e.headers).get("Content-Type");return r!==null&&r.startsWith("multipart/form-data")||r!==null&&r.startsWith("application/x-www-form-urlencoded")?ct(e,t):{}};async function ct(e,t){let s=await e.formData();return s?lt(s,t):{}}function lt(e,t){let s={};return e.forEach((r,n)=>{t.all||n.endsWith("[]")?ht(s,n,r):s[n]=r}),s}var ht=(e,t,s)=>{let r=e[t];r&&Array.isArray(r)?e[t].push(s):r?e[t]=[r,s]:e[t]=s};var oe=e=>{let t=e.split("/");return t[0]===""&&t.shift(),t},$e=e=>{let{groups:t,path:s}=dt(e),r=oe(s);return ut(r,t)},dt=e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{let n=`@${r}`;return t.push([n,s]),n}),{groups:t,path:e}},ut=(e,t)=>{for(let s=t.length-1;s>=0;s--){let[r]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(r)){e[n]=e[n].replace(r,t[s][1]);break}}return e},B={},ae=e=>{if(e==="*")return"*";let t=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);return t?(B[e]||(t[2]?B[e]=[e,t[1],new RegExp("^"+t[2]+"$")]:B[e]=[e,t[1],!0]),B[e]):null},ie=e=>{let t=e.url,s=t.indexOf("?",8);return t.slice(t.indexOf("/",8),s===-1?void 0:s)},ke=e=>{let t=e.indexOf("?",8);return t===-1?"":"?"+e.slice(t+1)},Pe=e=>{let t=ie(e);return t.length>1&&t[t.length-1]==="/"?t.slice(0,-1):t},$=(...e)=>{let t="",s=!1;for(let r of e)t[t.length-1]==="/"&&(t=t.slice(0,-1),s=!0),r[0]!=="/"&&(r=`/${r}`),r==="/"&&s?t=`${t}/`:r!=="/"&&(t=`${t}${r}`),r==="/"&&t===""&&(t="/");return t},N=e=>{if(!e.match(/\:.+\?$/))return null;let t=e.split("/"),s=[],r="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&r===""?s.push("/"):s.push(r);let o=n.replace("?","");r+="/"+o,s.push(r)}else r+="/"+n}),s.filter((n,o,a)=>a.indexOf(n)===o)},ne=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),/%/.test(e)?k(e):e):e,Me=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let a=e.indexOf(`?${t}`,8);for(a===-1&&(a=e.indexOf(`&${t}`,8));a!==-1;){let c=e.charCodeAt(a+t.length+1);if(c===61){let i=a+t.length+2,l=e.indexOf("&",i);return ne(e.slice(i,l===-1?void 0:l))}else if(c==38||isNaN(c))return"";a=e.indexOf(`&${t}`,a+1)}if(r=/[%+]/.test(e),!r)return}let n={};r??=/[%+]/.test(e);let o=e.indexOf("?",8);for(;o!==-1;){let a=e.indexOf("&",o+1),c=e.indexOf("=",o);c>a&&a!==-1&&(c=-1);let i=e.slice(o+1,c===-1?a===-1?void 0:a:c);if(r&&(i=ne(i)),o=a,i==="")continue;let l;c===-1?l="":(l=e.slice(c+1,a===-1?void 0:a),r&&(l=ne(l))),s?(n[i]&&Array.isArray(n[i])||(n[i]=[]),n[i].push(l)):n[i]??=l}return t?n[t]:n},Oe=Me,Te=(e,t)=>Me(e,t,!0),k=decodeURIComponent;var D=class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",s=[[]]){this.raw=e,this.path=t,this.#e=s,this.#t={}}param(e){return e?this.getDecodedParam(e):this.getAllDecodedParams()}getDecodedParam(e){let t=this.#e[0][this.routeIndex][1][e],s=this.getParamValue(t);return s?/\%/.test(s)?k(s):s:void 0}getAllDecodedParams(){let e={},t=Object.keys(this.#e[0][this.routeIndex][1]);for(let s of t){let r=this.getParamValue(this.#e[0][this.routeIndex][1][s]);r&&typeof r=="string"&&(e[s]=/\%/.test(r)?k(r):r)}return e}getParamValue(e){return this.#e[1]?this.#e[1][e]:e}query(e){return Oe(this.url,e)}queries(e){return Te(this.url,e)}header(e){if(e)return this.raw.headers.get(e.toLowerCase())??void 0;let t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){if(this.bodyCache.parsedBody)return this.bodyCache.parsedBody;let t=await He(this,e);return this.bodyCache.parsedBody=t,t}cachedBody=e=>{let{bodyCache:t,raw:s}=this,r=t[e];if(r)return r;if(!t[e]){for(let n of Object.keys(t))if(n!=="parsedBody")return(async()=>{let o=await t[n];return n==="json"&&(o=JSON.stringify(o)),await new Response(o)[e]()})()}return t[e]=s[e]()};json(){return this.cachedBody("json")}text(){return this.cachedBody("text")}arrayBuffer(){return this.cachedBody("arrayBuffer")}blob(){return this.cachedBody("blob")}formData(){return this.cachedBody("formData")}addValidatedData(e,t){this.#t[e]=t}valid(e){return this.#t[e]}get url(){return this.raw.url}get method(){return this.raw.method}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}};var u="ALL",Ce="all",_e=["get","post","put","delete","options","patch"],G="Can not add a route since the matcher is already built.",K=class extends Error{};var pt=Symbol("composedHandler");function ft(){return class{}}var mt=e=>e.text("404 Not Found",404),je=(e,t)=>e instanceof x?e.getResponse():(console.error(e),t.text("Internal Server Error",500)),ce=class extends ft(){router;getPath;_basePath="/";#t="/";routes=[];constructor(e={}){super(),[..._e,Ce].forEach(r=>{this[r]=(n,...o)=>(typeof n=="string"?this.#t=n:this.addRoute(r,this.#t,n),o.forEach(a=>{typeof a!="string"&&this.addRoute(r,this.#t,a)}),this)}),this.on=(r,n,...o)=>{if(!r)return this;for(let a of[n].flat()){this.#t=a;for(let c of[r].flat())o.map(i=>{this.addRoute(c.toUpperCase(),this.#t,i)})}return this},this.use=(r,...n)=>(typeof r=="string"?this.#t=r:(this.#t="*",n.unshift(r)),n.forEach(o=>{this.addRoute(u,this.#t,o)}),this);let s=e.strict??!0;delete e.strict,Object.assign(this,e),this.getPath=s?e.getPath??ie:Pe}clone(){let e=new ce({router:this.router,getPath:this.getPath});return e.routes=this.routes,e}notFoundHandler=mt;errorHandler=je;route(e,t){let s=this.basePath(e);return t?(t.routes.map(r=>{let n;t.errorHandler===je?n=r.handler:(n=async(o,a)=>(await se([],t.errorHandler)(o,()=>r.handler(o,a))).res,n[pt]=r.handler),s.addRoute(r.method,r.path,n)}),this):s}basePath(e){let t=this.clone();return t._basePath=$(this._basePath,e),t}onError=e=>(this.errorHandler=e,this);notFound=e=>(this.notFoundHandler=e,this);mount(e,t,s){let r=$(this._basePath,e),n=r==="/"?0:r.length,o=async(a,c)=>{let i;try{i=a.executionCtx}catch{}let l=s?s(a):[a.env,i],h=Array.isArray(l)?l:[l],d=ke(a.req.url),f=await t(new Request(new URL((a.req.path.slice(n)||"/")+d,a.req.url),a.req.raw),...h);if(f)return f;await c()};return this.addRoute(u,$(e,"*"),o),this}addRoute(e,t,s){e=e.toUpperCase(),t=$(this._basePath,t);let r={path:t,method:e,handler:s};this.router.add(e,t,[s,r]),this.routes.push(r)}matchRoute(e,t){return this.router.match(e,t)}handleError(e,t){if(e instanceof Error)return this.errorHandler(e,t);throw e}dispatch(e,t,s,r){if(r==="HEAD")return(async()=>new Response(null,await this.dispatch(e,t,s,"GET")))();let n=this.getPath(e,{env:s}),o=this.matchRoute(r,n),a=new H(new D(e,n,o),{env:s,executionCtx:t,notFoundHandler:this.notFoundHandler});if(o[0].length===1){let i;try{i=o[0][0][0][0](a,async()=>{a.res=await this.notFoundHandler(a)})}catch(l){return this.handleError(l,a)}return i instanceof Promise?i.then(l=>l||(a.finalized?a.res:this.notFoundHandler(a))).catch(l=>this.handleError(l,a)):i}let c=se(o[0],this.errorHandler,this.notFoundHandler);return(async()=>{try{let i=await c(a);if(!i.finalized)throw new Error("Context is not finalized. You may forget returning Response object or `await next()`");return i.res}catch(i){return this.handleError(i,a)}})()}fetch=(e,...t)=>this.dispatch(e,t[1],t[0],e.method);request=(e,t,s,r)=>{if(e instanceof Request)return t!==void 0&&(e=new Request(e,t)),this.fetch(e,s,r);e=e.toString();let n=/^https?:\/\//.test(e)?e:`http://localhost${$("/",e)}`,o=new Request(n,t);return this.fetch(o,s,r)};fire=()=>{addEventListener("fetch",e=>{e.respondWith(this.dispatch(e.request,e,void 0,e.request.method))})}};var Y="[^/]+",j=".*",A="(?:|/.*)",P=Symbol(),yt=new Set(".\\+*[^]$()");function gt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===j||e===A?1:t===j||t===A?-1:e===Y?1:t===Y?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var W=class{index;varIndex;children=Object.create(null);insert(e,t,s,r,n){if(e.length===0){if(this.index!==void 0)throw P;if(n)return;this.index=t;return}let[o,...a]=e,c=o==="*"?a.length===0?["","",j]:["","",Y]:o==="/*"?["","",A]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),i;if(c){let l=c[1],h=c[2]||Y;if(l&&c[2]&&(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h)))throw P;if(i=this.children[h],!i){if(Object.keys(this.children).some(d=>d!==j&&d!==A))throw P;if(n)return;i=this.children[h]=new W,l!==""&&(i.varIndex=r.varIndex++)}!n&&l!==""&&s.push([l,i.varIndex])}else if(i=this.children[o],!i){if(Object.keys(this.children).some(l=>l.length>1&&l!==j&&l!==A))throw P;if(n)return;i=this.children[o]=new W}i.insert(a,t,s,r,n)}buildRegExpStr(){let t=Object.keys(this.children).sort(gt).map(s=>{let r=this.children[s];return(typeof r.varIndex=="number"?`(${s})@${r.varIndex}`:yt.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof this.index=="number"&&t.unshift(`#${this.index}`),t.length===0?"":t.length===1?t[0]:"(?:"+t.join("|")+")"}};var Ae=class{context={varIndex:0};root=new W;insert(e,t,s){let r=[],n=[];for(let a=0;;){let c=!1;if(e=e.replace(/\{[^}]+\}/g,i=>{let l=`@\\${a}`;return n[a]=[l,i],a++,c=!0,l}),!c)break}let o=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=n.length-1;a>=0;a--){let[c]=n[a];for(let i=o.length-1;i>=0;i--)if(o[i].indexOf(c)!==-1){o[i]=o[i].replace(c,n[a][1]);break}}return this.root.insert(o,t,r,this.context,s),r}buildRegExp(){let e=this.root.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0,s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,o,a)=>typeof o<"u"?(s[++t]=Number(o),"$()"):(typeof a<"u"&&(r[Number(a)]=++t),"")),[new RegExp(`^${e}`),s,r]}};var Le=[],wt=[/^$/,[],Object.create(null)],ze=Object.create(null);function qe(e){return ze[e]??=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`)}function bt(){ze=Object.create(null)}function xt(e){let t=new Ae,s=[];if(e.length===0)return wt;let r=e.map(l=>[!/\*|\/:/.test(l[0]),...l]).sort(([l,h],[d,f])=>l?1:d?-1:h.length-f.length),n=Object.create(null);for(let l=0,h=-1,d=r.length;l<d;l++){let[f,w,p]=r[l];f?n[w]=[p.map(([g])=>[g,Object.create(null)]),Le]:h++;let y;try{y=t.insert(w,h,f)}catch(g){throw g===P?new K(w):g}f||(s[h]=p.map(([g,S])=>{let C=Object.create(null);for(S-=1;S>=0;S--){let[b,F]=y[S];C[b]=F}return[g,C]}))}let[o,a,c]=t.buildRegExp();for(let l=0,h=s.length;l<h;l++)for(let d=0,f=s[l].length;d<f;d++){let w=s[l][d]?.[1];if(!w)continue;let p=Object.keys(w);for(let y=0,g=p.length;y<g;y++)w[p[y]]=c[w[p[y]]]}let i=[];for(let l in a)i[l]=s[a[l]];return[o,i,n]}function M(e,t){if(e){for(let s of Object.keys(e).sort((r,n)=>n.length-r.length))if(qe(s).test(t))return[...e[s]]}}var le=class{name="RegExpRouter";middleware;routes;constructor(){this.middleware={[u]:Object.create(null)},this.routes={[u]:Object.create(null)}}add(e,t,s){let{middleware:r,routes:n}=this;if(!r||!n)throw new Error(G);r[e]||[r,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[u]).forEach(i=>{c[e][i]=[...c[u][i]]})}),t==="/*"&&(t="*");let o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){let c=qe(t);e===u?Object.keys(r).forEach(i=>{r[i][t]||=M(r[i],t)||M(r[u],t)||[]}):r[e][t]||=M(r[e],t)||M(r[u],t)||[],Object.keys(r).forEach(i=>{(e===u||e===i)&&Object.keys(r[i]).forEach(l=>{c.test(l)&&r[i][l].push([s,o])})}),Object.keys(n).forEach(i=>{(e===u||e===i)&&Object.keys(n[i]).forEach(l=>c.test(l)&&n[i][l].push([s,o]))});return}let a=N(t)||[t];for(let c=0,i=a.length;c<i;c++){let l=a[c];Object.keys(n).forEach(h=>{(e===u||e===h)&&(n[h][l]||=[...M(r[h],l)||M(r[u],l)||[]],n[h][l].push([s,o-i+c+1]))})}}match(e,t){bt();let s=this.buildAllMatchers();return this.match=(r,n)=>{let o=s[r]||s[u],a=o[2][n];if(a)return a;let c=n.match(o[0]);if(!c)return[[],Le];let i=c.indexOf("",1);return[o[1][i],c]},this.match(e,t)}buildAllMatchers(){let e=Object.create(null);return[...Object.keys(this.routes),...Object.keys(this.middleware)].forEach(t=>{e[t]||=this.buildMatcher(t)}),this.middleware=this.routes=void 0,e}buildMatcher(e){let t=[],s=e===u;return[this.middleware,this.routes].forEach(r=>{let n=r[e]?Object.keys(r[e]).map(o=>[o,r[e][o]]):[];n.length!==0?(s||=!0,t.push(...n)):e!==u&&t.push(...Object.keys(r[u]).map(o=>[o,r[u][o]]))}),s?xt(t):null}};var he=class{name="SmartRouter";routers=[];routes=[];constructor(e){Object.assign(this,e)}add(e,t,s){if(!this.routes)throw new Error(G);this.routes.push([e,t,s])}match(e,t){if(!this.routes)throw new Error("Fatal error");let{routers:s,routes:r}=this,n=s.length,o=0,a;for(;o<n;o++){let c=s[o];try{r.forEach(i=>{c.add(...i)}),a=c.match(e,t)}catch(i){if(i instanceof K)continue;throw i}this.match=c.match.bind(c),this.routers=[c],this.routes=void 0;break}if(o===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(this.routes||this.routers.length!==1)throw new Error("No active router has been determined yet.");return this.routers[0]}};var de=class{methods;children;patterns;order=0;name;params=Object.create(null);constructor(e,t,s){if(this.children=s||Object.create(null),this.methods=[],this.name="",e&&t){let r=Object.create(null);r[e]={handler:t,possibleKeys:[],score:0,name:this.name},this.methods=[r]}this.patterns=[]}insert(e,t,s){this.name=`${e} ${t}`,this.order=++this.order;let r=this,n=$e(t),o=[];for(let i=0,l=n.length;i<l;i++){let h=n[i];if(Object.keys(r.children).includes(h)){r=r.children[h];let f=ae(h);f&&o.push(f[1]);continue}r.children[h]=new de;let d=ae(h);d&&(r.patterns.push(d),o.push(d[1])),r=r.children[h]}r.methods.length||(r.methods=[]);let a=Object.create(null),c={handler:s,possibleKeys:o.filter((i,l,h)=>h.indexOf(i)===l),name:this.name,score:this.order};return a[e]=c,r.methods.push(a),r}gHSets(e,t,s,r){let n=[];for(let o=0,a=e.methods.length;o<a;o++){let c=e.methods[o],i=c[t]||c[u],l=Object.create(null);i!==void 0&&(i.params=Object.create(null),i.possibleKeys.forEach(h=>{let d=l[i.name];i.params[h]=r[h]&&!d?r[h]:s[h]??r[h],l[i.name]=!0}),n.push(i))}return n}search(e,t){let s=[];this.params=Object.create(null);let n=[this],o=oe(t);for(let c=0,i=o.length;c<i;c++){let l=o[c],h=c===i-1,d=[];for(let f=0,w=n.length;f<w;f++){let p=n[f],y=p.children[l];y&&(y.params=p.params,h===!0?(y.children["*"]&&s.push(...this.gHSets(y.children["*"],e,p.params,Object.create(null))),s.push(...this.gHSets(y,e,p.params,Object.create(null)))):d.push(y));for(let g=0,S=p.patterns.length;g<S;g++){let C=p.patterns[g],b={...p.params};if(C==="*"){let ee=p.children["*"];ee&&(s.push(...this.gHSets(ee,e,p.params,Object.create(null))),d.push(ee));continue}if(l==="")continue;let[F,Re,_]=C,E=p.children[F],Se=o.slice(c).join("/");if(_ instanceof RegExp&&_.test(Se)){b[Re]=Se,s.push(...this.gHSets(E,e,p.params,b));continue}(_===!0||_ instanceof RegExp&&_.test(l))&&typeof F=="string"&&(b[Re]=l,h===!0?(s.push(...this.gHSets(E,e,b,p.params)),E.children["*"]&&s.push(...this.gHSets(E.children["*"],e,b,p.params))):(E.params=b,d.push(E)))}}n=d}return[s.sort((c,i)=>c.score-i.score).map(({handler:c,params:i})=>[c,i])]}};var ue=class{name="TrieRouter";node;constructor(){this.node=new de}add(e,t,s){let r=N(t);if(r){for(let n of r)this.node.insert(e,n,s);return}this.node.insert(e,t,s)}match(e,t){return this.node.search(e,t)}};var R=class extends ce{constructor(e={}){super(e),this.router=e.router??new he({routers:[new le,new ue]})}};var Ie=e=>{e.onError((t,s)=>{if(t instanceof x){s.status(t.status);let r=t.res?.headers;return s.json({error:t.message||t.res?.statusText},t.status,r?Object.fromEntries(r):{})}return console.error(`${t}`),s.json({error:`Error Occur ${t}`},500)}),e.notFound(t=>t.json({error:`Not Found ${t.req.raw.url}`},404))};var Ue=()=>{let e=globalThis;return e?.Deno!==void 0?"deno":e?.Bun!==void 0?"bun":typeof e?.WebSocketPair=="function"?"workerd":typeof e?.EdgeRuntime=="string"?"edge-light":e?.fastly!==void 0?"fastly":e?.process?.release?.name==="node"?"node":"other"};var vt=/^[\w!#$%&'*.^`|~+-]+$/,Rt=/^[ !#-:<-[\]-~]*$/,pe=(e,t)=>e.trim().split(";").reduce((r,n)=>{n=n.trim();let o=n.indexOf("=");if(o===-1)return r;let a=n.substring(0,o).trim();if(t&&t!==a||!vt.test(a))return r;let c=n.substring(o+1).trim();return c.startsWith('"')&&c.endsWith('"')&&(c=c.slice(1,-1)),Rt.test(c)&&(r[a]=k(c)),r},{});var Fe=(e,t,s)=>{let r=e.req.raw.headers.get("Cookie");if(typeof t=="string"){if(!r)return;let o=t;return s==="secure"?o="__Secure-"+t:s==="host"&&(o="__Host-"+t),pe(r,o)[o]}return r?pe(r):{}};var De=(e,t)=>new Response(e,{headers:{"Content-Type":t}}).formData();var fe=(e,t)=>async(s,r)=>{let n={},o=s.req.header("Content-Type");switch(e){case"json":if(!o||!/^application\/([a-z-]+\+)?json/.test(o)){let c=`Invalid HTTP header: Content-Type=${o}`;throw new x(400,{message:c})}try{n=await s.req.json()}catch{let c="Malformed JSON in request body";throw new x(400,{message:c})}break;case"form":{if(!o)break;if(s.req.bodyCache.formData){n=await s.req.bodyCache.formData;break}try{let c=await s.req.arrayBuffer(),i=await De(c,o),l={};i.forEach((h,d)=>{d.endsWith("[]")?l[d]===void 0?l[d]=[h]:Array.isArray(l[d])&&l[d].push(h):l[d]=h}),n=l,s.req.bodyCache.formData=i}catch(c){let i="Malformed FormData request.";throw i+=c instanceof Error?` ${c.message}`:` ${String(c)}`,new x(400,{message:i})}break}case"query":n=Object.fromEntries(Object.entries(s.req.queries()).map(([c,i])=>i.length===1?[c,i[0]]:[c,i]));break;case"param":n=s.req.param();break;case"header":n=s.req.header();break;case"cookie":n=Fe(s);break}let a=await t(n,s);if(a instanceof Response)return a;s.req.addValidatedData(e,a),await r()};var St=e=>{let t=new URL(e);return new Headers({"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",Origin:t.host,Referer:t.origin,Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","Accept-Encoding":"gzip, deflate, br","Accept-Language":"en-US,en;q=0.9","Cache-Control":"no-cache",Pragma:"no-cache",Connection:"keep-alive","Upgrade-Insecure-Requests":"1"})};function Et(e){return e!==null&&typeof e=="object"}function me(...e){let t={};for(let s of e){if(!Et(s))throw new TypeError("All arguments must be of type object");let r=new Headers(s);for(let[n,o]of r.entries())o===void 0||o==="undefined"?delete t[n]:t[n]=o}return new Headers(t)}var v=async(e,t,s=8e3)=>{let n=0,o,a=me(St(e),t?.headers?t.headers:{});for(console.log(`[customFetch] ${e} Fetching data...`);n<3;)try{let c=await Promise.race([fetch(e,{...t,headers:a}),new Promise((i,l)=>setTimeout(()=>l("TIMEOUT"),s))]);if(c)return c;n++}catch(c){c=c,console.error(`[customFetch] ${e} Failed to fetch data: ${c} and retrying...`),n++}throw new Error(`[customFetch] ${e} Failed to fetch data after ${n} retries reason: ${o}`)};var L=new R;L.get("/ping",e=>e.text("pong",200));L.get("/runtime",e=>e.json({runtime:Ue()}));var Ht=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,$t=fe("query",(e,t)=>typeof e.url!="string"?t.json({error:`Invalid URL ${e.url}`},400):Ht.test(e.url)?{url:e.url}:t.json({error:`Invalid URL ${e.url}`},400));L.all("/proxy",$t,async e=>{let t=e.req.valid("query").url;console.log(`[defaultRoute] Fetching data from ${t}...`);let s=await v(t,{headers:me(e.req.raw.headers,{"Accept-Encoding":"identity"}),method:e.req.method});return e.newResponse(s.body,s.status,Object.fromEntries(s.headers))});L.get("/speedtest",async e=>{let t="https://github.com/AaronFeng753/Waifu2x-Extension-GUI/releases/download/v2.21.12/Waifu2x-Extension-GUI-v2.21.12-Portable.7z",s=await v(t,{headers:e.req.raw.headers,method:e.req.method});return console.log(`[defaultRoute] Speedtest from ${t}...`),e.newResponse(s.body,s.status,Object.fromEntries(s.headers))});var Be=L;var m=(e,t,s)=>e.replace("${"+t+"}",s),Ne=async(e,t)=>{let s=e;s=m(s,"x",t.x),s=m(s,"y",t.y),s=m(s,"z",t.z),s=m(s,"serverpart",Math.floor(Math.random()*4).toString()),console.log(`[defaultMapHandler] reqURL: ${s}`);let r=await v(s);return new Response(r.body,{status:r.status,statusText:r.statusText,headers:r.headers})};var Ge=async(e,t)=>{let s=e;s=m(s,"x",t.x),s=m(s,"y",t.y),s=m(s,"z",t.z),s=m(s,"serverpart",["a","b","c"][Math.floor(Math.random()*3)]),console.log(`[OSMTansportMapHandler] reqURL: ${s}`);let r=await v(s);return new Response(r.body,{status:r.status,statusText:r.statusText,headers:r.headers})},z=e=>async(s,r)=>{let n=s;n=m(n,"x",r.x),n=m(n,"y",r.y),n=m(n,"z",r.z),n=m(n,"serverpart",Math.floor(Math.random()*4).toString()),console.log(`[RefererMapHandle] reqURL: ${n}`);let o=await v(n,{headers:{Referer:e}});return new Response(o.body,{status:o.status,statusText:o.statusText,headers:o.headers})},Ke=e=>async(s,r)=>{let n=s;n=m(n,"x",r.x),n=m(n,"y",r.y),n=m(n,"z",r.z),n=m(n,"serverpart",Math.floor(Math.random()*4).toString()),console.log(`[CustomHeader] reqURL: ${n}`);let o=await v(n,{headers:{...e}});return new Response(o.body,{status:o.status,statusText:o.statusText,headers:o.headers})};var V=[{name:"Google Satellite Old",type:"gso",url:"https://www.google.com/maps/vt?lyrs=s@189&x=${x}&y=${y}&z=${z}"},{name:"Google Satellite New",type:"gs",url:"https://khms${serverpart}.google.com/kh/v=979?x=${x}&y=${y}&z=${z}"},{name:"Google Map",type:"gm",url:"https://mt${serverpart}.google.com/vt/lyrs=r&x=${x}&y=${y}&z=${z}"},{name:"Google Satellite Hybrid",type:"gsh",url:"https://mt${serverpart}.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}"},{name:"Google Terrain Hybrid",type:"gt",url:"https://www.google.com/maps/vt/pb=!1m4!1m3!1i${z}!2i${x}!3i${y}!2m2!1e5!2sshading!2m2!1e6!2scontours!2m3!1e0!2sm!3i693438634!3m7!5e1105!12m1!1e67!12m1!1e63!12m1!1e3!4e0!5f1.25!6b1"},{name:"Google Rouds",type:"gr",url:"https://mt${serverpart}.google.com/vt/lyrs=h&x=${x}&y=${y}&z=${z}"},{name:"Openstreetmap Standard",type:"osms",url:"https://tile.openstreetmap.org/${z}/${x}/${y}.png",handler:z("https://map.gov.cn")},{name:"Openstreetmap Public GPS trace",type:"osmgps",url:"https://gps.tile.openstreetmap.org/lines/${z}/${x}/${y}.png"},{name:"TraceStrack Topo Map",type:"ttm",url:"https://tile.tracestrack.com/topo__/${z}/${x}/${y}.png?key=383118983d4a867dd2d367451720d724",handler:z("https://www.openstreetmap.org/")},{name:"OpenStreetMap Transport",type:"osmtsp",url:"https://${serverpart}.tile.thunderforest.com/transport/${z}/${x}/${y}.png?apikey=6e5478c8a4f54c779f85573c0e399391",handler:Ge},{name:"FlightRadar64 Google Map 512x",type:"frgm",url:"https://maps.google.com/maps/vt?pb=!1m5!1m4!1i${z}!2i${x}!3i${y}!4i256!2m3!1e4!2st!3i693!2m3!1e0!2sr!3i693439057!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjMzfHMuZTpsfHAudjpvZmY!4e0!5m1!5f2&client=gme-flightradar24ab1&token=10424"},{name:"FlightRadar64 Google Satellite",type:"frgs",url:"https://khms${serverpart}.googleapis.com/kh?v=979&hl=en&x=${x}&y=${y}&z=${z}"},{name:"Maritime Map www.shipfinder.com",type:"maritime_shipfinder",url:"https://m12.shipxy.com/tile.c?l=En&m=F&x=${x}&y=${y}&z=${z}"},{name:"Maritime Map webapp.navionics.com",type:"maritime_navionics",url:"https://backend.navionics.com/tile/${z}/${x}/${y}?LAYERS=config_1_20.00_0&TRANSPARENT=FALSE&UGC=TRUE&theme=0&navtoken=eyJrZXkiOiJOQVZJT05JQ1NfV0VCQVBQX1AwMSIsImtleURvbWFpbiI6IndlYmFwcC5uYXZpb25pY3MuY29tIiwicmVmZXJlciI6IndlYmFwcC5uYXZpb25pY3MuY29tIiwicmFuZG9tIjoxNzE2MzQ4MDUzMzk2fQ",handler:z("https://webapp.navionics.com/")},{name:"Arcgis Satelite",type:"arcgis_satelite",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}"},{name:"Map here satelite maps.here.com",type:"mh_satelite",url:"https://maps.hereapi.com/v3/background/mc/${z}/${x}/${y}/jpeg?xnlp=CL_JSMv3.1.53.0&apikey=cPzg70fN-9K-pQtvdvCZErZu-VZLEocbLVEOOq2sVaQ&style=satellite.day&ppi=400&size=256&lang=en&lang2=en",handler:z("https://maps.here.com/")},{name:"Test Router",type:"t",url:"https://cip.cc/",handler:Ke({"User-Agent":"curl/7.68.0"})}];var Ye=new R;Ye.get("/:type/:x{[0-9]+}/:y{[0-9]+}/:z{[0-9]+}",async e=>{let{type:t,x:s,y:r,z:n}=e.req.param(),o=V.find(i=>i.type===t);return o?await(o.handler||Ne)(o.url,{type:t,x:s,y:r,z:n}):e.json({error:`Map type ${t} not found!`},404)});var We=Ye;var kt=`
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
				<svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
					<g id="color">
						<circle
							cx="36"
							cy="36"
							r="28"
							fill="#92D3F5"
							stroke="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
						/>
					</g>
					<g id="hair" />
					<g id="skin" />
					<g id="skin-shadow" />
					<g id="line">
						<circle
							cx="36"
							cy="36"
							r="28"
							fill="none"
							stroke="#000000"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
						/>
						<path
							fill="none"
							stroke="#000000"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
							d="M36,8v56c-8.5604,0-15.5-12.536-15.5-28S27.4396,8,36,8c8.5604,0,15.5,12.536,15.5,28S44.5604,64,36,64"
						/>
						<line
							x1="64"
							x2="8"
							y1="36"
							y2="36"
							fill="none"
							stroke="#000000"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
						/>
						<line
							x1="60"
							x2="12"
							y1="22"
							y2="22"
							fill="none"
							stroke="#000000"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
						/>
						<line
							x1="60"
							x2="12"
							y1="50"
							y2="50"
							fill="none"
							stroke="#000000"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
						/>
					</g>
				</svg>

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

			svg {
				width: 50px;
				height: 50px;
				margin: 0 auto;
				display: block;
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
`,Ve=(e,t)=>{let s="";return e.forEach(r=>{s+=`
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
        `}),s},Xe=(e,t)=>kt.replace(`{{%${e}%}}`,t);var q=new R({strict:!1});q.get("/",e=>{let s=new URL(e.req.url).origin;return e.html(Xe("items",Ve(V,s)))});Ie(q);q.route("/",Be);q.route("/map",We);var Ze=q;import{Http2ServerRequest as Qe}from"http2";import{Readable as Pt}from"stream";import Lt from"crypto";var X=class extends Error{static name="RequestError";constructor(e,t){super(e,t)}},Mt=e=>e instanceof X?e:new X(e.message,{cause:e}),Ot=global.Request,Z=class extends Ot{constructor(e,t){typeof e=="object"&&O in e&&(e=e[O]()),typeof t?.body?.getReader<"u"&&(t.duplex??="half"),super(e,t)}},Tt=(e,t,s,r)=>{let n=[],o=s.rawHeaders;for(let c=0;c<o.length;c+=2){let{[c]:i,[c+1]:l}=o;i.charCodeAt(0)!==58&&n.push([i,l])}let a={method:e,headers:n,signal:r.signal};return e==="GET"||e==="HEAD"||(a.body=Pt.toWeb(s)),new Z(t,a)},O=Symbol("getRequestCache"),Ct=Symbol("requestCache"),ge=Symbol("incomingKey"),we=Symbol("urlKey"),ye=Symbol("abortControllerKey"),et=Symbol("getAbortController"),Q={get method(){return this[ge].method||"GET"},get url(){return this[we]},[et](){return this[O](),this[ye]},[O](){return this[ye]||=new AbortController,this[Ct]||=Tt(this.method,this[we],this[ge],this[ye])}};["body","bodyUsed","cache","credentials","destination","headers","integrity","mode","redirect","referrer","referrerPolicy","signal","keepalive"].forEach(e=>{Object.defineProperty(Q,e,{get(){return this[O]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(Q,e,{value:function(){return this[O]()[e]()}})});Object.setPrototypeOf(Q,Z.prototype);var _t=(e,t)=>{let s=Object.create(Q);s[ge]=e;let r=(e instanceof Qe?e.authority:e.headers.host)||t;if(!r)throw new X("Missing host header");let n=new URL(`${e instanceof Qe||e.socket&&e.socket.encrypted?"https":"http"}://${r}${e.url}`);if(n.hostname.length!==r.length&&n.hostname!==r.replace(/:\d+$/,""))throw new X("Invalid host header");return s[we]=n.href,s};function be(e,t){if(e.locked)throw new TypeError("ReadableStream is locked.");if(t.destroyed){e.cancel();return}let s=e.getReader();return t.on("close",r),t.on("error",r),s.read().then(o,r),s.closed.finally(()=>{t.off("close",r),t.off("error",r)});function r(a){s.cancel(a).catch(()=>{}),a&&t.destroy(a)}function n(){s.read().then(o,r)}function o({done:a,value:c}){try{if(a)t.end();else if(!t.write(c))t.once("drain",n);else return s.read().then(o,r)}catch(i){r(i)}}}var tt=e=>{let t={},s=[];for(let[r,n]of e)r==="set-cookie"?s.push(n):t[r]=n;return s.length>0&&(t["set-cookie"]=s),t["content-type"]??="text/plain; charset=UTF-8",t},Je=Symbol("responseCache"),I=Symbol("getResponseCache"),U=Symbol("cache"),J=global.Response,T=class rt{#t;#e;[I](){return delete this[U],this[Je]||=new J(this.#t,this.#e)}constructor(t,s){if(this.#t=t,s instanceof rt){let r=s[Je];if(r){this.#e=r,this[I]();return}else this.#e=s.#e}else this.#e=s;if(typeof t=="string"||typeof t?.getReader<"u"){let r=s?.headers||{"content-type":"text/plain; charset=UTF-8"};r instanceof Headers&&(r=tt(r)),this[U]=[s?.status||200,t,r]}}};["body","bodyUsed","headers","ok","redirected","status","statusText","trailers","type","url"].forEach(e=>{Object.defineProperty(T.prototype,e,{get(){return this[I]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(T.prototype,e,{value:function(){return this[I]()[e]()}})});Object.setPrototypeOf(T,J);Object.setPrototypeOf(T.prototype,J.prototype);var xe=Reflect.ownKeys(new J).find(e=>typeof e=="symbol"&&e.toString()==="Symbol(state)");xe||console.warn("Failed to find Response internal state key");function jt(e){if(!xe)return;e instanceof T&&(e=e[I]());let t=e[xe];return t&&t.body||void 0}var At="x-hono-already-sent",zt=global.fetch;typeof global.crypto>"u"&&(global.crypto=Lt);global.fetch=(e,t)=>(t={compress:!1,...t},zt(e,t));var qt=/^no$/i,It=/^(application\/json\b|text\/(?!event-stream\b))/i,Ut=()=>new Response(null,{status:400}),st=e=>new Response(null,{status:e instanceof Error&&(e.name==="TimeoutError"||e.constructor.name==="TimeoutError")?504:500}),ve=(e,t)=>{let s=e instanceof Error?e:new Error("unknown error",{cause:e});s.code==="ERR_STREAM_PREMATURE_CLOSE"?console.info("The user aborted a request."):(console.error(e),t.headersSent||t.writeHead(500,{"Content-Type":"text/plain"}),t.end(`Error: ${s.message}`),t.destroy(s))},nt=(e,t)=>{let[s,r,n]=e[U];if(typeof r=="string")n["Content-Length"]=Buffer.byteLength(r),t.writeHead(s,n),t.end(r);else return t.writeHead(s,n),be(r,t)?.catch(o=>ve(o,t))},Ft=async(e,t,s={})=>{if(e instanceof Promise)if(s.errorHandler)try{e=await e}catch(o){let a=await s.errorHandler(o);if(!a)return;e=a}else e=await e.catch(st);if(U in e)return nt(e,t);let r=tt(e.headers),n=jt(e);if(n)n.length&&(r["content-length"]=n.length),t.writeHead(e.status,r),typeof n.source=="string"||n.source instanceof Uint8Array?t.end(n.source):n.source instanceof Blob?t.end(new Uint8Array(await n.source.arrayBuffer())):await be(n.stream,t);else if(e.body){let{"transfer-encoding":o,"content-encoding":a,"content-length":c,"x-accel-buffering":i,"content-type":l}=r;if(o||a||c||i&&qt.test(i)||!It.test(l))t.writeHead(e.status,r),await be(e.body,t);else{let h=await e.arrayBuffer();r["content-length"]=h.byteLength,t.writeHead(e.status,r),t.end(new Uint8Array(h))}}else r[At]||(t.writeHead(e.status,r),t.end())},Dt=(e,t={})=>(t.overrideGlobalObjects!==!1&&global.Request!==Z&&(Object.defineProperty(global,"Request",{value:Z}),Object.defineProperty(global,"Response",{value:T})),async(s,r)=>{let n,o;try{if(o=_t(s,t.hostname),r.on("close",()=>{s.destroyed&&o[et]().abort()}),n=e(o,{incoming:s,outgoing:r}),U in n)return nt(n,r)}catch(a){if(n)return ve(a,r);if(t.errorHandler){if(n=await t.errorHandler(o?a:Mt(a)),!n)return}else o?n=st(a):n=Ut()}try{return Ft(n,r,t)}catch(a){return ve(a,r)}}),ot=e=>Dt(e.fetch);var Xs=ot(Ze);export{Xs as default};
