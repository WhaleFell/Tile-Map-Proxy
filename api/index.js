var xe={Stringify:1,BeforeStream:2,Stream:3},st=(e,t)=>{let s=new String(e);return s.isEscaped=!0,s.callbacks=t,s};var te=async(e,t,s,r,n)=>{let o=e.callbacks;if(!o?.length)return Promise.resolve(e);n?n[0]+=e:n=[e];let a=Promise.all(o.map(c=>c({phase:t,buffer:n,context:r}))).then(c=>Promise.all(c.filter(Boolean).map(i=>te(i,t,!1,r,n))).then(()=>n[0]));return s?st(await a,o):a};var nt="text/plain; charset=UTF-8",re=(e,t={})=>(Object.entries(t).forEach(([s,r])=>e.set(s,r)),e),E=class{req;env={};_var={};finalized=!1;error=void 0;#t=200;#e;#r=void 0;#s=void 0;#n;#o=!0;layout=void 0;renderer=e=>this.html(e);notFoundHandler=()=>new Response;constructor(e,t){this.req=e,t&&(this.#e=t.executionCtx,this.env=t.env,t.notFoundHandler&&(this.notFoundHandler=t.notFoundHandler))}get event(){if(this.#e&&"respondWith"in this.#e)return this.#e;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#e)return this.#e;throw Error("This context has no ExecutionContext")}get res(){return this.#o=!1,this.#n||=new Response("404 Not Found",{status:404})}set res(e){if(this.#o=!1,this.#n&&e){this.#n.headers.delete("content-type");for(let[t,s]of this.#n.headers.entries())if(t==="set-cookie"){let r=this.#n.headers.getSetCookie();e.headers.delete("set-cookie");for(let n of r)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}this.#n=e,this.finalized=!0}render=(...e)=>this.renderer(...e);setLayout=e=>this.layout=e;getLayout=()=>this.layout;setRenderer=e=>{this.renderer=e};header=(e,t,s)=>{if(t===void 0){this.#r?this.#r.delete(e):this.#s&&delete this.#s[e.toLocaleLowerCase()],this.finalized&&this.res.headers.delete(e);return}s?.append?(this.#r||(this.#o=!1,this.#r=new Headers(this.#s),this.#s={}),this.#r.append(e,t)):this.#r?this.#r.set(e,t):(this.#s??={},this.#s[e.toLowerCase()]=t),this.finalized&&(s?.append?this.res.headers.append(e,t):this.res.headers.set(e,t))};status=e=>{this.#o=!1,this.#t=e};set=(e,t)=>{this._var??={},this._var[e]=t};get=e=>this._var?this._var[e]:void 0;get var(){return{...this._var}}newResponse=(e,t,s)=>{if(this.#o&&!s&&!t&&this.#t===200)return new Response(e,{headers:this.#s});if(t&&typeof t!="number"){let n=new Headers(t.headers);this.#r&&this.#r.forEach((a,c)=>{c==="set-cookie"?n.append(c,a):n.set(c,a)});let o=re(n,this.#s);return new Response(e,{headers:o,status:t.status??this.#t})}let r=typeof t=="number"?t:this.#t;this.#s??={},this.#r??=new Headers,re(this.#r,this.#s),this.#n&&(this.#n.headers.forEach((n,o)=>{o==="set-cookie"?this.#r?.append(o,n):this.#r?.set(o,n)}),re(this.#r,this.#s)),s??={};for(let[n,o]of Object.entries(s))if(typeof o=="string")this.#r.set(n,o);else{this.#r.delete(n);for(let a of o)this.#r.append(n,a)}return new Response(e,{status:r,headers:this.#r})};body=(e,t,s)=>typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t);text=(e,t,s)=>{if(!this.#s){if(this.#o&&!s&&!t)return new Response(e);this.#s={}}return this.#s["content-type"]=nt,typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t)};json=(e,t,s)=>{let r=JSON.stringify(e);return this.#s??={},this.#s["content-type"]="application/json; charset=UTF-8",typeof t=="number"?this.newResponse(r,t,s):this.newResponse(r,t)};html=(e,t,s)=>(this.#s??={},this.#s["content-type"]="text/html; charset=UTF-8",typeof e=="object"&&(e instanceof Promise||(e=e.toString()),e instanceof Promise)?e.then(r=>te(r,xe.Stringify,!1,{})).then(r=>typeof t=="number"?this.newResponse(r,t,s):this.newResponse(r,t)):typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t));redirect=(e,t=302)=>(this.#r??=new Headers,this.#r.set("Location",e),this.newResponse(null,t));notFound=()=>this.notFoundHandler(this)};var se=(e,t,s)=>(r,n)=>{let o=-1;return a(0);async function a(c){if(c<=o)throw new Error("next() called multiple times");o=c;let i,l=!1,h;if(e[c]?(h=e[c][0][0],r instanceof E&&(r.req.routeIndex=c)):h=c===e.length&&n||void 0,!h)r instanceof E&&r.finalized===!1&&s&&(i=await s(r));else try{i=await h(r,()=>a(c+1))}catch(d){if(d instanceof Error&&r instanceof E&&t)r.error=d,i=await t(d,r),l=!0;else throw d}return i&&(r.finalized===!1||l)&&(r.res=i),r}};var q=class extends Error{res;status;constructor(e=500,t){super(t?.message,{cause:t?.cause}),this.res=t?.res,this.status=e}getResponse(){return this.res?new Response(this.res.body,{status:this.status,headers:this.res.headers}):new Response(this.message,{status:this.status})}};var Re=async(e,t={all:!1})=>{let r=(e instanceof F?e.raw.headers:e.headers).get("Content-Type");return r!==null&&r.startsWith("multipart/form-data")||r!==null&&r.startsWith("application/x-www-form-urlencoded")?ot(e,t):{}};async function ot(e,t){let s=await e.formData();return s?at(s,t):{}}function at(e,t){let s={};return e.forEach((r,n)=>{t.all||n.endsWith("[]")?it(s,n,r):s[n]=r}),s}var it=(e,t,s)=>{let r=e[t];r&&Array.isArray(r)?e[t].push(s):r?e[t]=[r,s]:e[t]=s};var oe=e=>{let t=e.split("/");return t[0]===""&&t.shift(),t},Se=e=>{let{groups:t,path:s}=ct(e),r=oe(s);return lt(r,t)},ct=e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{let n=`@${r}`;return t.push([n,s]),n}),{groups:t,path:e}},lt=(e,t)=>{for(let s=t.length-1;s>=0;s--){let[r]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(r)){e[n]=e[n].replace(r,t[s][1]);break}}return e},U={},ae=e=>{if(e==="*")return"*";let t=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);return t?(U[e]||(t[2]?U[e]=[e,t[1],new RegExp("^"+t[2]+"$")]:U[e]=[e,t[1],!0]),U[e]):null},ie=e=>{let t=e.url,s=t.indexOf("?",8);return t.slice(t.indexOf("/",8),s===-1?void 0:s)},Ee=e=>{let t=e.indexOf("?",8);return t===-1?"":"?"+e.slice(t+1)},$e=e=>{let t=ie(e);return t.length>1&&t[t.length-1]==="/"?t.slice(0,-1):t},$=(...e)=>{let t="",s=!1;for(let r of e)t[t.length-1]==="/"&&(t=t.slice(0,-1),s=!0),r[0]!=="/"&&(r=`/${r}`),r==="/"&&s?t=`${t}/`:r!=="/"&&(t=`${t}${r}`),r==="/"&&t===""&&(t="/");return t},N=e=>{if(!e.match(/\:.+\?$/))return null;let t=e.split("/"),s=[],r="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&r===""?s.push("/"):s.push(r);let o=n.replace("?","");r+="/"+o,s.push(r)}else r+="/"+n}),s.filter((n,o,a)=>a.indexOf(n)===o)},ne=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),/%/.test(e)?D(e):e):e,He=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let a=e.indexOf(`?${t}`,8);for(a===-1&&(a=e.indexOf(`&${t}`,8));a!==-1;){let c=e.charCodeAt(a+t.length+1);if(c===61){let i=a+t.length+2,l=e.indexOf("&",i);return ne(e.slice(i,l===-1?void 0:l))}else if(c==38||isNaN(c))return"";a=e.indexOf(`&${t}`,a+1)}if(r=/[%+]/.test(e),!r)return}let n={};r??=/[%+]/.test(e);let o=e.indexOf("?",8);for(;o!==-1;){let a=e.indexOf("&",o+1),c=e.indexOf("=",o);c>a&&a!==-1&&(c=-1);let i=e.slice(o+1,c===-1?a===-1?void 0:a:c);if(r&&(i=ne(i)),o=a,i==="")continue;let l;c===-1?l="":(l=e.slice(c+1,a===-1?void 0:a),r&&(l=ne(l))),s?(n[i]&&Array.isArray(n[i])||(n[i]=[]),n[i].push(l)):n[i]??=l}return t?n[t]:n},Me=He,Pe=(e,t)=>He(e,t,!0),D=decodeURIComponent;var F=class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",s=[[]]){this.raw=e,this.path=t,this.#e=s,this.#t={}}param(e){return e?this.getDecodedParam(e):this.getAllDecodedParams()}getDecodedParam(e){let t=this.#e[0][this.routeIndex][1][e],s=this.getParamValue(t);return s?/\%/.test(s)?D(s):s:void 0}getAllDecodedParams(){let e={},t=Object.keys(this.#e[0][this.routeIndex][1]);for(let s of t){let r=this.getParamValue(this.#e[0][this.routeIndex][1][s]);r&&typeof r=="string"&&(e[s]=/\%/.test(r)?D(r):r)}return e}getParamValue(e){return this.#e[1]?this.#e[1][e]:e}query(e){return Me(this.url,e)}queries(e){return Pe(this.url,e)}header(e){if(e)return this.raw.headers.get(e.toLowerCase())??void 0;let t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){if(this.bodyCache.parsedBody)return this.bodyCache.parsedBody;let t=await Re(this,e);return this.bodyCache.parsedBody=t,t}cachedBody=e=>{let{bodyCache:t,raw:s}=this,r=t[e];if(r)return r;if(!t[e]){for(let n of Object.keys(t))if(n!=="parsedBody")return(async()=>{let o=await t[n];return n==="json"&&(o=JSON.stringify(o)),await new Response(o)[e]()})()}return t[e]=s[e]()};json(){return this.cachedBody("json")}text(){return this.cachedBody("text")}arrayBuffer(){return this.cachedBody("arrayBuffer")}blob(){return this.cachedBody("blob")}formData(){return this.cachedBody("formData")}addValidatedData(e,t){this.#t[e]=t}valid(e){return this.#t[e]}get url(){return this.raw.url}get method(){return this.raw.method}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}};var u="ALL",Oe="all",Te=["get","post","put","delete","options","patch"],B="Can not add a route since the matcher is already built.",G=class extends Error{};var ht=Symbol("composedHandler");function dt(){return class{}}var ut=e=>e.text("404 Not Found",404),Ce=(e,t)=>e instanceof q?e.getResponse():(console.error(e),t.text("Internal Server Error",500)),ce=class extends dt(){router;getPath;_basePath="/";#t="/";routes=[];constructor(e={}){super(),[...Te,Oe].forEach(r=>{this[r]=(n,...o)=>(typeof n=="string"?this.#t=n:this.addRoute(r,this.#t,n),o.forEach(a=>{typeof a!="string"&&this.addRoute(r,this.#t,a)}),this)}),this.on=(r,n,...o)=>{if(!r)return this;for(let a of[n].flat()){this.#t=a;for(let c of[r].flat())o.map(i=>{this.addRoute(c.toUpperCase(),this.#t,i)})}return this},this.use=(r,...n)=>(typeof r=="string"?this.#t=r:(this.#t="*",n.unshift(r)),n.forEach(o=>{this.addRoute(u,this.#t,o)}),this);let s=e.strict??!0;delete e.strict,Object.assign(this,e),this.getPath=s?e.getPath??ie:$e}clone(){let e=new ce({router:this.router,getPath:this.getPath});return e.routes=this.routes,e}notFoundHandler=ut;errorHandler=Ce;route(e,t){let s=this.basePath(e);return t?(t.routes.map(r=>{let n;t.errorHandler===Ce?n=r.handler:(n=async(o,a)=>(await se([],t.errorHandler)(o,()=>r.handler(o,a))).res,n[ht]=r.handler),s.addRoute(r.method,r.path,n)}),this):s}basePath(e){let t=this.clone();return t._basePath=$(this._basePath,e),t}onError=e=>(this.errorHandler=e,this);notFound=e=>(this.notFoundHandler=e,this);mount(e,t,s){let r=$(this._basePath,e),n=r==="/"?0:r.length,o=async(a,c)=>{let i;try{i=a.executionCtx}catch{}let l=s?s(a):[a.env,i],h=Array.isArray(l)?l:[l],d=Ee(a.req.url),f=await t(new Request(new URL((a.req.path.slice(n)||"/")+d,a.req.url),a.req.raw),...h);if(f)return f;await c()};return this.addRoute(u,$(e,"*"),o),this}addRoute(e,t,s){e=e.toUpperCase(),t=$(this._basePath,t);let r={path:t,method:e,handler:s};this.router.add(e,t,[s,r]),this.routes.push(r)}matchRoute(e,t){return this.router.match(e,t)}handleError(e,t){if(e instanceof Error)return this.errorHandler(e,t);throw e}dispatch(e,t,s,r){if(r==="HEAD")return(async()=>new Response(null,await this.dispatch(e,t,s,"GET")))();let n=this.getPath(e,{env:s}),o=this.matchRoute(r,n),a=new E(new F(e,n,o),{env:s,executionCtx:t,notFoundHandler:this.notFoundHandler});if(o[0].length===1){let i;try{i=o[0][0][0][0](a,async()=>{a.res=await this.notFoundHandler(a)})}catch(l){return this.handleError(l,a)}return i instanceof Promise?i.then(l=>l||(a.finalized?a.res:this.notFoundHandler(a))).catch(l=>this.handleError(l,a)):i}let c=se(o[0],this.errorHandler,this.notFoundHandler);return(async()=>{try{let i=await c(a);if(!i.finalized)throw new Error("Context is not finalized. You may forget returning Response object or `await next()`");return i.res}catch(i){return this.handleError(i,a)}})()}fetch=(e,...t)=>this.dispatch(e,t[1],t[0],e.method);request=(e,t,s,r)=>{if(e instanceof Request)return t!==void 0&&(e=new Request(e,t)),this.fetch(e,s,r);e=e.toString();let n=/^https?:\/\//.test(e)?e:`http://localhost${$("/",e)}`,o=new Request(n,t);return this.fetch(o,s,r)};fire=()=>{addEventListener("fetch",e=>{e.respondWith(this.dispatch(e.request,e,void 0,e.request.method))})}};var Y="[^/]+",k=".*",L="(?:|/.*)",H=Symbol(),pt=new Set(".\\+*[^]$()");function ft(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===k||e===L?1:t===k||t===L?-1:e===Y?1:t===Y?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var K=class{index;varIndex;children=Object.create(null);insert(e,t,s,r,n){if(e.length===0){if(this.index!==void 0)throw H;if(n)return;this.index=t;return}let[o,...a]=e,c=o==="*"?a.length===0?["","",k]:["","",Y]:o==="/*"?["","",L]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),i;if(c){let l=c[1],h=c[2]||Y;if(l&&c[2]&&(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h)))throw H;if(i=this.children[h],!i){if(Object.keys(this.children).some(d=>d!==k&&d!==L))throw H;if(n)return;i=this.children[h]=new K,l!==""&&(i.varIndex=r.varIndex++)}!n&&l!==""&&s.push([l,i.varIndex])}else if(i=this.children[o],!i){if(Object.keys(this.children).some(l=>l.length>1&&l!==k&&l!==L))throw H;if(n)return;i=this.children[o]=new K}i.insert(a,t,s,r,n)}buildRegExpStr(){let t=Object.keys(this.children).sort(ft).map(s=>{let r=this.children[s];return(typeof r.varIndex=="number"?`(${s})@${r.varIndex}`:pt.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof this.index=="number"&&t.unshift(`#${this.index}`),t.length===0?"":t.length===1?t[0]:"(?:"+t.join("|")+")"}};var ke=class{context={varIndex:0};root=new K;insert(e,t,s){let r=[],n=[];for(let a=0;;){let c=!1;if(e=e.replace(/\{[^}]+\}/g,i=>{let l=`@\\${a}`;return n[a]=[l,i],a++,c=!0,l}),!c)break}let o=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=n.length-1;a>=0;a--){let[c]=n[a];for(let i=o.length-1;i>=0;i--)if(o[i].indexOf(c)!==-1){o[i]=o[i].replace(c,n[a][1]);break}}return this.root.insert(o,t,r,this.context,s),r}buildRegExp(){let e=this.root.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0,s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,o,a)=>typeof o<"u"?(s[++t]=Number(o),"$()"):(typeof a<"u"&&(r[Number(a)]=++t),"")),[new RegExp(`^${e}`),s,r]}};var Le=[],mt=[/^$/,[],Object.create(null)],Ae=Object.create(null);function je(e){return Ae[e]??=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`)}function yt(){Ae=Object.create(null)}function gt(e){let t=new ke,s=[];if(e.length===0)return mt;let r=e.map(l=>[!/\*|\/:/.test(l[0]),...l]).sort(([l,h],[d,f])=>l?1:d?-1:h.length-f.length),n=Object.create(null);for(let l=0,h=-1,d=r.length;l<d;l++){let[f,b,p]=r[l];f?n[b]=[p.map(([g])=>[g,Object.create(null)]),Le]:h++;let y;try{y=t.insert(b,h,f)}catch(g){throw g===H?new G(b):g}f||(s[h]=p.map(([g,R])=>{let T=Object.create(null);for(R-=1;R>=0;R--){let[w,I]=y[R];T[w]=I}return[g,T]}))}let[o,a,c]=t.buildRegExp();for(let l=0,h=s.length;l<h;l++)for(let d=0,f=s[l].length;d<f;d++){let b=s[l][d]?.[1];if(!b)continue;let p=Object.keys(b);for(let y=0,g=p.length;y<g;y++)b[p[y]]=c[b[p[y]]]}let i=[];for(let l in a)i[l]=s[a[l]];return[o,i,n]}function M(e,t){if(e){for(let s of Object.keys(e).sort((r,n)=>n.length-r.length))if(je(s).test(t))return[...e[s]]}}var le=class{name="RegExpRouter";middleware;routes;constructor(){this.middleware={[u]:Object.create(null)},this.routes={[u]:Object.create(null)}}add(e,t,s){let{middleware:r,routes:n}=this;if(!r||!n)throw new Error(B);r[e]||[r,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[u]).forEach(i=>{c[e][i]=[...c[u][i]]})}),t==="/*"&&(t="*");let o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){let c=je(t);e===u?Object.keys(r).forEach(i=>{r[i][t]||=M(r[i],t)||M(r[u],t)||[]}):r[e][t]||=M(r[e],t)||M(r[u],t)||[],Object.keys(r).forEach(i=>{(e===u||e===i)&&Object.keys(r[i]).forEach(l=>{c.test(l)&&r[i][l].push([s,o])})}),Object.keys(n).forEach(i=>{(e===u||e===i)&&Object.keys(n[i]).forEach(l=>c.test(l)&&n[i][l].push([s,o]))});return}let a=N(t)||[t];for(let c=0,i=a.length;c<i;c++){let l=a[c];Object.keys(n).forEach(h=>{(e===u||e===h)&&(n[h][l]||=[...M(r[h],l)||M(r[u],l)||[]],n[h][l].push([s,o-i+c+1]))})}}match(e,t){yt();let s=this.buildAllMatchers();return this.match=(r,n)=>{let o=s[r]||s[u],a=o[2][n];if(a)return a;let c=n.match(o[0]);if(!c)return[[],Le];let i=c.indexOf("",1);return[o[1][i],c]},this.match(e,t)}buildAllMatchers(){let e=Object.create(null);return[...Object.keys(this.routes),...Object.keys(this.middleware)].forEach(t=>{e[t]||=this.buildMatcher(t)}),this.middleware=this.routes=void 0,e}buildMatcher(e){let t=[],s=e===u;return[this.middleware,this.routes].forEach(r=>{let n=r[e]?Object.keys(r[e]).map(o=>[o,r[e][o]]):[];n.length!==0?(s||=!0,t.push(...n)):e!==u&&t.push(...Object.keys(r[u]).map(o=>[o,r[u][o]]))}),s?gt(t):null}};var he=class{name="SmartRouter";routers=[];routes=[];constructor(e){Object.assign(this,e)}add(e,t,s){if(!this.routes)throw new Error(B);this.routes.push([e,t,s])}match(e,t){if(!this.routes)throw new Error("Fatal error");let{routers:s,routes:r}=this,n=s.length,o=0,a;for(;o<n;o++){let c=s[o];try{r.forEach(i=>{c.add(...i)}),a=c.match(e,t)}catch(i){if(i instanceof G)continue;throw i}this.match=c.match.bind(c),this.routers=[c],this.routes=void 0;break}if(o===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(this.routes||this.routers.length!==1)throw new Error("No active router has been determined yet.");return this.routers[0]}};var de=class{methods;children;patterns;order=0;name;params=Object.create(null);constructor(e,t,s){if(this.children=s||Object.create(null),this.methods=[],this.name="",e&&t){let r=Object.create(null);r[e]={handler:t,possibleKeys:[],score:0,name:this.name},this.methods=[r]}this.patterns=[]}insert(e,t,s){this.name=`${e} ${t}`,this.order=++this.order;let r=this,n=Se(t),o=[];for(let i=0,l=n.length;i<l;i++){let h=n[i];if(Object.keys(r.children).includes(h)){r=r.children[h];let f=ae(h);f&&o.push(f[1]);continue}r.children[h]=new de;let d=ae(h);d&&(r.patterns.push(d),o.push(d[1])),r=r.children[h]}r.methods.length||(r.methods=[]);let a=Object.create(null),c={handler:s,possibleKeys:o.filter((i,l,h)=>h.indexOf(i)===l),name:this.name,score:this.order};return a[e]=c,r.methods.push(a),r}gHSets(e,t,s,r){let n=[];for(let o=0,a=e.methods.length;o<a;o++){let c=e.methods[o],i=c[t]||c[u],l=Object.create(null);i!==void 0&&(i.params=Object.create(null),i.possibleKeys.forEach(h=>{let d=l[i.name];i.params[h]=r[h]&&!d?r[h]:s[h]??r[h],l[i.name]=!0}),n.push(i))}return n}search(e,t){let s=[];this.params=Object.create(null);let n=[this],o=oe(t);for(let c=0,i=o.length;c<i;c++){let l=o[c],h=c===i-1,d=[];for(let f=0,b=n.length;f<b;f++){let p=n[f],y=p.children[l];y&&(y.params=p.params,h===!0?(y.children["*"]&&s.push(...this.gHSets(y.children["*"],e,p.params,Object.create(null))),s.push(...this.gHSets(y,e,p.params,Object.create(null)))):d.push(y));for(let g=0,R=p.patterns.length;g<R;g++){let T=p.patterns[g],w={...p.params};if(T==="*"){let ee=p.children["*"];ee&&(s.push(...this.gHSets(ee,e,p.params,Object.create(null))),d.push(ee));continue}if(l==="")continue;let[I,we,C]=T,S=p.children[I],ve=o.slice(c).join("/");if(C instanceof RegExp&&C.test(ve)){w[we]=ve,s.push(...this.gHSets(S,e,p.params,w));continue}(C===!0||C instanceof RegExp&&C.test(l))&&typeof I=="string"&&(w[we]=l,h===!0?(s.push(...this.gHSets(S,e,w,p.params)),S.children["*"]&&s.push(...this.gHSets(S.children["*"],e,w,p.params))):(S.params=w,d.push(S)))}}n=d}return[s.sort((c,i)=>c.score-i.score).map(({handler:c,params:i})=>[c,i])]}};var ue=class{name="TrieRouter";node;constructor(){this.node=new de}add(e,t,s){let r=N(t);if(r){for(let n of r)this.node.insert(e,n,s);return}this.node.insert(e,t,s)}match(e,t){return this.node.search(e,t)}};var v=class extends ce{constructor(e={}){super(e),this.router=e.router??new he({routers:[new le,new ue]})}};var _e=e=>{e.onError((t,s)=>{if(t instanceof q){s.status(t.status);let r=t.res?.headers;return s.json({error:t.message||t.res?.statusText},t.status,r?Object.fromEntries(r):{})}return console.error(`${t}`),s.json({error:`Error Occur ${t}`},500)}),e.notFound(t=>t.json({error:`Not Found ${t.req.raw.url}`},404))};var ze=()=>{let e=globalThis;return e?.Deno!==void 0?"deno":e?.Bun!==void 0?"bun":typeof e?.WebSocketPair=="function"?"workerd":typeof e?.EdgeRuntime=="string"?"edge-light":e?.fastly!==void 0?"fastly":e?.process?.release?.name==="node"?"node":"other"};var bt=e=>{let t=new URL(e);return{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",Origin:t.host,Referer:t.origin,Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","Accept-Encoding":"gzip, deflate, br","Accept-Language":"en-US,en;q=0.9","Cache-Control":"no-cache",Pragma:"no-cache",Connection:"keep-alive","Upgrade-Insecure-Requests":"1"}},x=async(e,t,s=8e3)=>{let n=0,o={...bt(e),...t?.headers};for(console.log(`[customFetch] ${e} Fetching data...`);n<3;)try{let a=await Promise.race([fetch(e,{...t,headers:o}),new Promise((c,i)=>setTimeout(()=>i("TIMEOUT"),s))]);if(a)return a;n++}catch(a){console.error(`[customFetch] ${e} Failed to fetch data: ${a} and retrying...`),n++}throw new Error(`[customFetch] ${e} Failed to fetch data after ${n} retries`)},Ie=async(e,t)=>{await t(),console.log("[delHeaderLengthMiddleware] Deleting Content-Length header..."),e.res.headers.delete("content-length"),e.res.headers.delete("content-encoding")};var X=new v;X.get("/ping",e=>e.text("pong",200));X.get("/runtime",e=>e.json({runtime:ze()}));X.all("/proxy/:url{.*?}",Ie,async e=>{let t=e.req.param("url");console.log(`[defaultRoute] Fetching data from ${t}...`);let s=await x(t,{headers:e.req.raw.headers,method:e.req.method});return e.newResponse(s.body,s.status,Object.fromEntries(s.headers))});var qe=X;var Fe=e=>{if(!globalThis.caches)return console.log("Cache Middleware is not enabled because caches is not defined."),async(n,o)=>await o();e.wait===void 0&&(e.wait=!1);let t=e.cacheControl?.split(",").map(n=>n.toLowerCase()),s=Array.isArray(e.vary)?e.vary:e.vary?.split(",").map(n=>n.trim());if(e.vary?.includes("*"))throw new Error('Middleware vary configuration cannot include "*", as it disallows effective caching.');let r=n=>{if(t){let o=n.res.headers.get("Cache-Control")?.split(",").map(a=>a.trim().split("=",1)[0])??[];for(let a of t){let[c,i]=a.trim().split("=",2);c=c.toLowerCase(),o.includes(c)||n.header("Cache-Control",`${c}${i?`=${i}`:""}`,{append:!0})}}if(s){let o=n.res.headers.get("Vary")?.split(",").map(c=>c.trim())??[],a=Array.from(new Set([...o,...s].map(c=>c.toLowerCase()))).sort();a.includes("*")?n.header("Vary","*"):n.header("Vary",a.join(", "))}};return async function(o,a){let c=o.req.url;e.keyGenerator&&(c=await e.keyGenerator(o));let i=typeof e.cacheName=="function"?await e.cacheName(o):e.cacheName,l=await caches.open(i),h=await l.match(c);if(h)return new Response(h.body,h);if(await a(),!o.res.ok)return;r(o);let d=o.res.clone();e.wait?await l.put(c,d):o.executionCtx.waitUntil(l.put(c,d))}};var m=(e,t,s)=>e.replace("${"+t+"}",s),Ue=async(e,t)=>{let s=e;s=m(s,"x",t.x),s=m(s,"y",t.y),s=m(s,"z",t.z),s=m(s,"serverpart",Math.floor(Math.random()*4).toString()),console.log(`[defaultMapHandler] reqURL: ${s}`);let r=await x(s);return new Response(r.body,{status:r.status,statusText:r.statusText,headers:r.headers})};var Ne=async(e,t)=>{let s=e;s=m(s,"x",t.x),s=m(s,"y",t.y),s=m(s,"z",t.z),s=m(s,"serverpart",["a","b","c"][Math.floor(Math.random()*3)]),console.log(`[OSMTansportMapHandler] reqURL: ${s}`);let r=await x(s);return new Response(r.body,{status:r.status,statusText:r.statusText,headers:r.headers})},A=e=>async(s,r)=>{let n=s;n=m(n,"x",r.x),n=m(n,"y",r.y),n=m(n,"z",r.z),n=m(n,"serverpart",Math.floor(Math.random()*4).toString()),console.log(`[RefererMapHandle] reqURL: ${n}`);let o=await x(n,{headers:{Referer:e}});return new Response(o.body,{status:o.status,statusText:o.statusText,headers:o.headers})},De=e=>async(s,r)=>{let n=s;n=m(n,"x",r.x),n=m(n,"y",r.y),n=m(n,"z",r.z),n=m(n,"serverpart",Math.floor(Math.random()*4).toString()),console.log(`[CustomHeader] reqURL: ${n}`);let o=await x(n,{headers:{...e}});return new Response(o.body,{status:o.status,statusText:o.statusText,headers:o.headers})};var Z=[{name:"Google Satellite Old",type:"gso",url:"https://www.google.com/maps/vt?lyrs=s@189&x=${x}&y=${y}&z=${z}"},{name:"Google Satellite New",type:"gs",url:"https://khms${serverpart}.google.com/kh/v=979?x=${x}&y=${y}&z=${z}"},{name:"Google Map",type:"gm",url:"https://mt${serverpart}.google.com/vt/lyrs=r&x=${x}&y=${y}&z=${z}"},{name:"Google Satellite Hybrid",type:"gsh",url:"https://mt${serverpart}.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}"},{name:"Google Terrain Hybrid",type:"gt",url:"https://www.google.com/maps/vt/pb=!1m4!1m3!1i${z}!2i${x}!3i${y}!2m2!1e5!2sshading!2m2!1e6!2scontours!2m3!1e0!2sm!3i693438634!3m7!5e1105!12m1!1e67!12m1!1e63!12m1!1e3!4e0!5f1.25!6b1"},{name:"Google Rouds",type:"gr",url:"https://mt${serverpart}.google.com/vt/lyrs=h&x=${x}&y=${y}&z=${z}"},{name:"Openstreetmap Standard",type:"osms",url:"https://tile.openstreetmap.org/${z}/${x}/${y}.png",handler:A("https://map.gov.cn")},{name:"Openstreetmap Public GPS trace",type:"osmgps",url:"https://gps.tile.openstreetmap.org/lines/${z}/${x}/${y}.png"},{name:"TraceStrack Topo Map",type:"ttm",url:"https://tile.tracestrack.com/topo__/${z}/${x}/${y}.png?key=383118983d4a867dd2d367451720d724",handler:A("https://www.openstreetmap.org/")},{name:"OpenStreetMap Transport",type:"osmtsp",url:"https://${serverpart}.tile.thunderforest.com/transport/${z}/${x}/${y}.png?apikey=6e5478c8a4f54c779f85573c0e399391",handler:Ne},{name:"FlightRadar64 Google Map 512x",type:"frgm",url:"https://maps.google.com/maps/vt?pb=!1m5!1m4!1i${z}!2i${x}!3i${y}!4i256!2m3!1e4!2st!3i693!2m3!1e0!2sr!3i693439057!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjMzfHMuZTpsfHAudjpvZmY!4e0!5m1!5f2&client=gme-flightradar24ab1&token=10424"},{name:"FlightRadar64 Google Satellite",type:"frgs",url:"https://khms${serverpart}.googleapis.com/kh?v=979&hl=en&x=${x}&y=${y}&z=${z}"},{name:"Maritime Map www.shipfinder.com",type:"maritime_shipfinder",url:"https://m12.shipxy.com/tile.c?l=En&m=F&x=${x}&y=${y}&z=${z}"},{name:"Maritime Map webapp.navionics.com",type:"maritime_navionics",url:"https://backend.navionics.com/tile/${z}/${x}/${y}?LAYERS=config_1_20.00_0&TRANSPARENT=FALSE&UGC=TRUE&theme=0&navtoken=eyJrZXkiOiJOQVZJT05JQ1NfV0VCQVBQX1AwMSIsImtleURvbWFpbiI6IndlYmFwcC5uYXZpb25pY3MuY29tIiwicmVmZXJlciI6IndlYmFwcC5uYXZpb25pY3MuY29tIiwicmFuZG9tIjoxNzE2MzQ4MDUzMzk2fQ",handler:A("https://webapp.navionics.com/")},{name:"Arcgis Satelite",type:"arcgis_satelite",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}"},{name:"Map here satelite maps.here.com",type:"mh_satelite",url:"https://maps.hereapi.com/v3/background/mc/${z}/${x}/${y}/jpeg?xnlp=CL_JSMv3.1.53.0&apikey=cPzg70fN-9K-pQtvdvCZErZu-VZLEocbLVEOOq2sVaQ&style=satellite.day&ppi=400&size=256&lang=en&lang2=en",handler:A("https://maps.here.com/")},{name:"Test Router",type:"t",url:"https://cip.cc/",handler:De({"User-Agent":"curl/7.68.0"})}];var Be=new v;Be.get("/:type/:x{[0-9]+}/:y{[0-9]+}/:z{[0-9]+}",Fe({cacheName:"map",keyGenerator:e=>e.req.url,cacheControl:"max-age=3600",wait:!1}),async e=>{let{type:t,x:s,y:r,z:n}=e.req.param(),o=Z.find(i=>i.type===t);return o?await(o.handler||Ue)(o.url,{type:t,x:s,y:r,z:n}):e.json({error:`Map type ${t} not found!`},404)});var Ge=Be;var wt=`
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
`,Ye=(e,t)=>{let s="";return e.forEach(r=>{s+=`
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
        `}),s},Ke=(e,t)=>wt.replace(`{{%${e}%}}`,t);var j=new v({strict:!1});j.get("/",e=>{let s=new URL(e.req.url).origin;return e.html(Ke("items",Ye(Z,s)))});_e(j);j.route("/",qe);j.route("/map",Ge);var Xe=j;import{Http2ServerRequest as Ze}from"http2";import{Readable as vt}from"stream";import Pt from"crypto";var W=class extends Error{static name="RequestError";constructor(e,t){super(e,t)}},xt=e=>e instanceof W?e:new W(e.message,{cause:e}),Rt=global.Request,V=class extends Rt{constructor(e,t){typeof e=="object"&&P in e&&(e=e[P]()),typeof t?.body?.getReader<"u"&&(t.duplex??="half"),super(e,t)}},St=(e,t,s,r)=>{let n=[],o=s.rawHeaders;for(let c=0;c<o.length;c+=2){let{[c]:i,[c+1]:l}=o;i.charCodeAt(0)!==58&&n.push([i,l])}let a={method:e,headers:n,signal:r.signal};return e==="GET"||e==="HEAD"||(a.body=vt.toWeb(s)),new V(t,a)},P=Symbol("getRequestCache"),Et=Symbol("requestCache"),fe=Symbol("incomingKey"),me=Symbol("urlKey"),pe=Symbol("abortControllerKey"),Ve=Symbol("getAbortController"),Q={get method(){return this[fe].method||"GET"},get url(){return this[me]},[Ve](){return this[P](),this[pe]},[P](){return this[pe]||=new AbortController,this[Et]||=St(this.method,this[me],this[fe],this[pe])}};["body","bodyUsed","cache","credentials","destination","headers","integrity","mode","redirect","referrer","referrerPolicy","signal","keepalive"].forEach(e=>{Object.defineProperty(Q,e,{get(){return this[P]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(Q,e,{value:function(){return this[P]()[e]()}})});Object.setPrototypeOf(Q,V.prototype);var $t=(e,t)=>{let s=Object.create(Q);s[fe]=e;let r=(e instanceof Ze?e.authority:e.headers.host)||t;if(!r)throw new W("Missing host header");let n=new URL(`${e instanceof Ze||e.socket&&e.socket.encrypted?"https":"http"}://${r}${e.url}`);if(n.hostname.length!==r.length&&n.hostname!==r.replace(/:\d+$/,""))throw new W("Invalid host header");return s[me]=n.href,s};function ye(e,t){if(e.locked)throw new TypeError("ReadableStream is locked.");if(t.destroyed){e.cancel();return}let s=e.getReader();return t.on("close",r),t.on("error",r),s.read().then(o,r),s.closed.finally(()=>{t.off("close",r),t.off("error",r)});function r(a){s.cancel(a).catch(()=>{}),a&&t.destroy(a)}function n(){s.read().then(o,r)}function o({done:a,value:c}){try{if(a)t.end();else if(!t.write(c))t.once("drain",n);else return s.read().then(o,r)}catch(i){r(i)}}}var Qe=e=>{let t={},s=[];for(let[r,n]of e)r==="set-cookie"?s.push(n):t[r]=n;return s.length>0&&(t["set-cookie"]=s),t["content-type"]??="text/plain; charset=UTF-8",t},We=Symbol("responseCache"),_=Symbol("getResponseCache"),z=Symbol("cache"),J=global.Response,O=class Je{#t;#e;[_](){return delete this[z],this[We]||=new J(this.#t,this.#e)}constructor(t,s){if(this.#t=t,s instanceof Je){let r=s[We];if(r){this.#e=r,this[_]();return}else this.#e=s.#e}else this.#e=s;if(typeof t=="string"||typeof t?.getReader<"u"){let r=s?.headers||{"content-type":"text/plain; charset=UTF-8"};r instanceof Headers&&(r=Qe(r)),this[z]=[s?.status||200,t,r]}}};["body","bodyUsed","headers","ok","redirected","status","statusText","trailers","type","url"].forEach(e=>{Object.defineProperty(O.prototype,e,{get(){return this[_]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(O.prototype,e,{value:function(){return this[_]()[e]()}})});Object.setPrototypeOf(O,J);Object.setPrototypeOf(O.prototype,J.prototype);var ge=Reflect.ownKeys(new J).find(e=>typeof e=="symbol"&&e.toString()==="Symbol(state)");ge||console.warn("Failed to find Response internal state key");function Ht(e){if(!ge)return;e instanceof O&&(e=e[_]());let t=e[ge];return t&&t.body||void 0}var Mt="x-hono-already-sent",Ot=global.fetch;typeof global.crypto>"u"&&(global.crypto=Pt);global.fetch=(e,t)=>(t={compress:!1,...t},Ot(e,t));var Tt=/^no$/i,Ct=/^(application\/json\b|text\/(?!event-stream\b))/i,kt=()=>new Response(null,{status:400}),et=e=>new Response(null,{status:e instanceof Error&&(e.name==="TimeoutError"||e.constructor.name==="TimeoutError")?504:500}),be=(e,t)=>{let s=e instanceof Error?e:new Error("unknown error",{cause:e});s.code==="ERR_STREAM_PREMATURE_CLOSE"?console.info("The user aborted a request."):(console.error(e),t.headersSent||t.writeHead(500,{"Content-Type":"text/plain"}),t.end(`Error: ${s.message}`),t.destroy(s))},tt=(e,t)=>{let[s,r,n]=e[z];if(typeof r=="string")n["Content-Length"]=Buffer.byteLength(r),t.writeHead(s,n),t.end(r);else return t.writeHead(s,n),ye(r,t)?.catch(o=>be(o,t))},Lt=async(e,t,s={})=>{if(e instanceof Promise)if(s.errorHandler)try{e=await e}catch(o){let a=await s.errorHandler(o);if(!a)return;e=a}else e=await e.catch(et);if(z in e)return tt(e,t);let r=Qe(e.headers),n=Ht(e);if(n)n.length&&(r["content-length"]=n.length),t.writeHead(e.status,r),typeof n.source=="string"||n.source instanceof Uint8Array?t.end(n.source):n.source instanceof Blob?t.end(new Uint8Array(await n.source.arrayBuffer())):await ye(n.stream,t);else if(e.body){let{"transfer-encoding":o,"content-encoding":a,"content-length":c,"x-accel-buffering":i,"content-type":l}=r;if(o||a||c||i&&Tt.test(i)||!Ct.test(l))t.writeHead(e.status,r),await ye(e.body,t);else{let h=await e.arrayBuffer();r["content-length"]=h.byteLength,t.writeHead(e.status,r),t.end(new Uint8Array(h))}}else r[Mt]||(t.writeHead(e.status,r),t.end())},At=(e,t={})=>(t.overrideGlobalObjects!==!1&&global.Request!==V&&(Object.defineProperty(global,"Request",{value:V}),Object.defineProperty(global,"Response",{value:O})),async(s,r)=>{let n,o;try{if(o=$t(s,t.hostname),r.on("close",()=>{s.destroyed&&o[Ve]().abort()}),n=e(o,{incoming:s,outgoing:r}),z in n)return tt(n,r)}catch(a){if(n)return be(a,r);if(t.errorHandler){if(n=await t.errorHandler(o?a:xt(a)),!n)return}else o?n=et(a):n=kt()}try{return Lt(n,r,t)}catch(a){return be(a,r)}}),rt=e=>At(e.fetch);var $s=rt(Xe);export{$s as default};
