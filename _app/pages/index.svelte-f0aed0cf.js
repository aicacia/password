import{R as _t,K as Pe,C as Qe,L as gt,S as le,i as se,s as ne,D as Oe,M as Ze,e as v,k as O,j as W,c as E,a as I,d as m,n as V,m as q,b as d,N as Z,f as T,F as _,o as F,O as M,G as Ve,H as Te,I as Ue,x as C,u as j,v as X,P as K,Q as Le,r as Ne,w as Ce,T as _e,U as wt,V as bt,W as ge,X as we,Y as be,Z as vt,_ as Et,$ as kt,t as G,g as z,a0 as xe,l as et,h as ve,a1 as tt,a2 as Be,a3 as It,J as ce,A as At,a4 as je,a5 as Me,a6 as yt,a7 as Dt}from"../chunks/vendor-265e019b.js";import{_ as $t}from"../chunks/preload-helper-04e99934.js";function lt(l){const{protocol:e,host:t,pathname:s,hash:n,search:r}=new URL(l);let o=`${e}//${t}${s}`;return n&&(o+=`#${n}`),r&&(o+=`?${r}`),o}const St="v21wdidfxjapm8b",Pt="399181883347-3dfijgbemptplmueu01bsfga9jpkks6j.apps.googleusercontent.com",ie=new _t;ie.setApiKeys({dropbox:St,googledrive:Pt});ie.access.claim("passwords","rw");ie.caching.enable("/passwords/");const Re=ie.scope("/passwords/");Re.declareType("passwords",{type:"object",properties:{".*":{type:"object",properties:{id:{type:"string",format:"uuid"},url:{type:"string",format:"uri"},username:{type:"string"},password:{type:"string"},createdAt:{type:"string",format:"date-time"},updatedAt:{type:"string",format:"date-time"}},required:["id","url","username","password","createdAt","updatedAt"]}}});const ae=Qe({});Pe(ae,l=>Object.values(l));const Ot=Pe(ae,l=>l),Vt=Pe(ae,l=>Object.values(l).reduce((e,t)=>((e[t.url]||(e[t.url]=[])).push(t),e),{}));function Tt(l,e,t){const n={id:gt(),url:lt(l),username:e,password:t,createdAt:new Date,updatedAt:new Date};ae.update(r=>(r[n.id]=n,Ge(r),r))}function Ut(l,e,t,s){ae.update(n=>{const r=n[l];return r&&(r.url=lt(e),r.username=t,r.password=s,r.updatedAt=new Date,Ge(n)),n})}function Lt(l){ae.update(e=>(delete e[l],Ge(e),e))}function Nt(l){return{id:l.id,url:l.url,username:l.username,password:l.password,createdAt:l.createdAt.toJSON(),updatedAt:l.updatedAt.toJSON()}}function Ct(l){return{id:l.id,url:l.url,username:l.username,password:l.password,createdAt:new Date(l.createdAt),updatedAt:new Date(l.updatedAt)}}function Ge(l){Re.storeObject("passwords","passwords.json",Object.values(l).reduce((e,t)=>(e[t.id]=Nt(t),e),{}))}function Bt(){Re.getObject("passwords.json",!1).then(l=>{l&&(delete l["@context"],ae.update(e=>(Object.values(l).forEach(t=>{const s=e[t.id],n=Ct(t);(!s||s.updatedAt<n.updatedAt)&&(e[t.id]=n)}),e)))})}ie.on("sync-done",Bt);const jt=l=>({}),st=l=>({});function Mt(l){let e,t,s,n,r,o,f,i,u,h,a,g,c,y,L,$;const D=l[4].title,p=Oe(D,l,l[3],st);u=new Ze({});const U=l[4].default,P=Oe(U,l,l[3],null);return{c(){e=v("div"),t=v("div"),s=v("div"),n=v("div"),r=v("div"),p&&p.c(),o=O(),f=v("button"),i=v("div"),W(u.$$.fragment),h=O(),a=v("div"),P&&P.c(),g=O(),c=v("div"),this.h()},l(A){e=E(A,"DIV",{class:!0});var k=I(e);t=E(k,"DIV",{class:!0});var x=I(t);s=E(x,"DIV",{class:!0});var w=I(s);n=E(w,"DIV",{class:!0});var S=I(n);r=E(S,"DIV",{class:!0});var H=I(r);p&&p.l(H),H.forEach(m),o=V(S),f=E(S,"BUTTON",{class:!0});var R=I(f);i=E(R,"DIV",{class:!0});var N=I(i);q(u.$$.fragment,N),N.forEach(m),R.forEach(m),S.forEach(m),h=V(w),a=E(w,"DIV",{class:!0});var Y=I(a);P&&P.l(Y),Y.forEach(m),w.forEach(m),x.forEach(m),k.forEach(m),g=V(A),c=E(A,"DIV",{class:!0}),I(c).forEach(m),this.h()},h(){d(r,"class","flex-grow"),d(i,"class","w-8 h-8"),d(f,"class","bg-transparent border-0 text-black outline-none focus:outline-none"),d(n,"class","flex items-start justify-between px-4 pt-4"),d(a,"class","relative p-4 flex-auto"),d(s,"class","border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"),d(t,"class","relative my-4 w-96 md:w-1/3 mx-auto"),d(e,"class","overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"),Z(e,"hidden",!l[0]),d(c,"class","opacity-25 fixed inset-0 z-40 bg-black"),Z(c,"hidden",!l[0])},m(A,k){T(A,e,k),_(e,t),_(t,s),_(s,n),_(n,r),p&&p.m(r,null),_(n,o),_(n,f),_(f,i),F(u,i,null),_(s,h),_(s,a),P&&P.m(a,null),T(A,g,k),T(A,c,k),y=!0,L||($=M(f,"click",l[1]),L=!0)},p(A,[k]){p&&p.p&&(!y||k&8)&&Ve(p,D,A,A[3],y?Ue(D,A[3],k,jt):Te(A[3]),st),P&&P.p&&(!y||k&8)&&Ve(P,U,A,A[3],y?Ue(U,A[3],k,null):Te(A[3]),null),k&1&&Z(e,"hidden",!A[0]),k&1&&Z(c,"hidden",!A[0])},i(A){y||(C(p,A),C(u.$$.fragment,A),C(P,A),y=!0)},o(A){j(p,A),j(u.$$.fragment,A),j(P,A),y=!1},d(A){A&&m(e),p&&p.d(A),X(u),P&&P.d(A),A&&m(g),A&&m(c),L=!1,$()}}}function Rt(l,e,t){let{$$slots:s={},$$scope:n}=e,{onClose:r=()=>{}}=e,{open:o=!1}=e;function f(){t(0,o=!1),r()}return l.$$set=i=>{"onClose"in i&&t(2,r=i.onClose),"open"in i&&t(0,o=i.open),"$$scope"in i&&t(3,n=i.$$scope)},[o,f,r,n,s]}class nt extends le{constructor(e){super();se(this,e,Rt,Mt,ne,{onClose:2,open:0})}}function Gt(l){let e,t;return e=new wt({}),{c(){W(e.$$.fragment)},l(s){q(e.$$.fragment,s)},m(s,n){F(e,s,n),t=!0},i(s){t||(C(e.$$.fragment,s),t=!0)},o(s){j(e.$$.fragment,s),t=!1},d(s){X(e,s)}}}function zt(l){let e,t;return e=new bt({}),{c(){W(e.$$.fragment)},l(s){q(e.$$.fragment,s)},m(s,n){F(e,s,n),t=!0},i(s){t||(C(e.$$.fragment,s),t=!0)},o(s){j(e.$$.fragment,s),t=!1},d(s){X(e,s)}}}function Ht(l){let e,t,s,n,r,o,f,i,u,h,a,g;const c=[zt,Gt],y=[];function L($,D){return $[1]?0:1}return i=L(l),u=y[i]=c[i](l),{c(){e=v("div"),t=v("input"),s=O(),n=v("input"),r=O(),o=v("button"),f=v("div"),u.c(),this.h()},l($){e=E($,"DIV",{class:!0});var D=I(e);t=E(D,"INPUT",{class:!0,type:!0,placeholder:!0}),s=V(D),n=E(D,"INPUT",{class:!0,type:!0,placeholder:!0}),r=V(D),o=E(D,"BUTTON",{class:!0});var p=I(o);f=E(p,"DIV",{class:!0});var U=I(f);u.l(U),U.forEach(m),p.forEach(m),D.forEach(m),this.h()},h(){d(t,"class","input"),d(t,"type","text"),d(t,"placeholder","Password"),Z(t,"hidden",!l[1]),d(n,"class","input"),d(n,"type","password"),d(n,"placeholder","Password"),Z(n,"hidden",l[1]),d(f,"class","w-6 h-6"),d(o,"class","text-black absolute top-0 bottom-0 right-2"),d(e,"class","relative")},m($,D){T($,e,D),_(e,t),K(t,l[0]),_(e,s),_(e,n),K(n,l[0]),_(e,r),_(e,o),_(o,f),y[i].m(f,null),h=!0,a||(g=[M(t,"input",l[3]),M(t,"input",function(){Le(l[2])&&l[2].apply(this,arguments)}),M(n,"input",l[4]),M(n,"input",function(){Le(l[2])&&l[2].apply(this,arguments)}),M(o,"click",l[5])],a=!0)},p($,[D]){l=$,D&1&&t.value!==l[0]&&K(t,l[0]),D&2&&Z(t,"hidden",!l[1]),D&1&&n.value!==l[0]&&K(n,l[0]),D&2&&Z(n,"hidden",l[1]);let p=i;i=L(l),i!==p&&(Ne(),j(y[p],1,1,()=>{y[p]=null}),Ce(),u=y[i],u||(u=y[i]=c[i](l),u.c()),C(u,1),u.m(f,null))},i($){h||(C(u),h=!0)},o($){j(u),h=!1},d($){$&&m(e),y[i].d(),a=!1,_e(g)}}}function Jt(l,e,t){let{password:s}=e,{onInput:n=()=>{}}=e,{show:r=!1}=e;function o(){s=this.value,t(0,s)}function f(){s=this.value,t(0,s)}const i=()=>t(1,r=!r);return l.$$set=u=>{"password"in u&&t(0,s=u.password),"onInput"in u&&t(2,n=u.onInput),"show"in u&&t(1,r=u.show)},[s,r,n,o,f,i]}class rt extends le{constructor(e){super();se(this,e,Jt,Ht,ne,{password:0,onInput:2,show:1})}}function Wt(l){let e,t,s,n,r,o,f,i,u,h,a,g,c,y,L;function $(p){l[8](p)}let D={password:l[2],onInput:l[5]};return l[4]!==void 0&&(D.show=l[4]),o=new rt({props:D}),ge.push(()=>we(o,"show",$)),g=new Ze({}),{c(){e=v("div"),t=v("input"),s=O(),n=v("div"),r=v("div"),W(o.$$.fragment),i=O(),u=v("div"),h=v("button"),a=v("div"),W(g.$$.fragment),this.h()},l(p){e=E(p,"DIV",{class:!0});var U=I(e);t=E(U,"INPUT",{class:!0,type:!0,placeholder:!0}),s=V(U),n=E(U,"DIV",{class:!0});var P=I(n);r=E(P,"DIV",{class:!0});var A=I(r);q(o.$$.fragment,A),A.forEach(m),i=V(P),u=E(P,"DIV",{class:!0});var k=I(u);h=E(k,"BUTTON",{class:!0});var x=I(h);a=E(x,"DIV",{class:!0});var w=I(a);q(g.$$.fragment,w),w.forEach(m),x.forEach(m),k.forEach(m),P.forEach(m),U.forEach(m),this.h()},h(){d(t,"class","input"),d(t,"type","text"),d(t,"placeholder","Username"),d(r,"class","flex-1"),d(a,"class","w-4 h-4"),d(h,"class","btn danger h-full px-3"),d(u,"class","flex-grow-0"),d(n,"class","flex"),d(e,"class","grid grid-cols-1 sm:grid-cols-2 gap-2")},m(p,U){T(p,e,U),_(e,t),K(t,l[0]),_(e,s),_(e,n),_(n,r),F(o,r,null),_(n,i),_(n,u),_(u,h),_(h,a),F(g,a,null),c=!0,y||(L=[M(t,"input",l[7]),M(t,"input",l[5]),M(h,"click",l[9])],y=!0)},p(p,[U]){U&1&&t.value!==p[0]&&K(t,p[0]);const P={};U&4&&(P.password=p[2]),!f&&U&16&&(f=!0,P.show=p[4],be(()=>f=!1)),o.$set(P)},i(p){c||(C(o.$$.fragment,p),C(g.$$.fragment,p),c=!0)},o(p){j(o.$$.fragment,p),j(g.$$.fragment,p),c=!1},d(p){p&&m(e),X(o),X(g),y=!1,_e(L)}}}function qt(l,e,t){let{id:s}=e,{url:n}=e,{username:r}=e,{password:o}=e,{onDelete:f=()=>{}}=e,i=!1;const u=vt(()=>{n&&r&&o&&Ut(s,n,r,o)},500);function h(){r=this.value,t(0,r)}function a(c){i=c,t(4,i)}const g=()=>f(s);return l.$$set=c=>{"id"in c&&t(1,s=c.id),"url"in c&&t(6,n=c.url),"username"in c&&t(0,r=c.username),"password"in c&&t(2,o=c.password),"onDelete"in c&&t(3,f=c.onDelete)},[r,s,o,f,i,u,n,h,a,g]}class Ft extends le{constructor(e){super();se(this,e,qt,Wt,ne,{id:1,url:6,username:0,password:2,onDelete:3})}}const Ee={length:16,includeSymbols:!0,excludeSimilarCharacters:!1,excludeAmbiguousCharacters:!1};function Xt(l={}){const e=Math.max(6,l.length||Ee.length),t=l.includeSymbols!=null?l.includeSymbols:Ee.includeSymbols,s=l.excludeSimilarCharacters!=null?l.excludeSimilarCharacters:Ee.excludeSimilarCharacters,n=l.excludeAmbiguousCharacters!=null?l.excludeAmbiguousCharacters:Ee.excludeAmbiguousCharacters,r=kt.fromSeed(Math.random()*Date.now());return Et(0,e).iter().map(()=>ze(r,t,s,n)).join("")}const Kt="il1Lo0O".split(""),Yt="{}[]()/\\'\"`~,;:.<>".split("");function ze(l,e,t,s){let n=e&&l.nextFloat()>.75?Zt(l):el(l);return t&&Kt.includes(n)&&(n=ze(l,e,t,s)),s&&Yt.includes(n)&&(n=ze(l,e,t,s)),n}const Qt="`~!@#$%^&*()-_+={}[]|:;<>,.\\/?".split("").sort(()=>Math.random()>.5?-1:1);function Zt(l){return l.fromArray(Qt).unwrap()}const xt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("").sort(()=>Math.random()>.5?-1:1);function el(l){return l.fromArray(xt).unwrap()}function tl(l){let e,t,s,n,r,o,f,i,u,h,a,g,c,y,L,$,D,p,U,P,A,k,x,w,S,H,R,N,Y,ke,Ie,ee,Ae,re,Q,ye,oe,De,he,te,$e,pe,fe,Se,He;function mt(b){l[12](b)}let Je={show:!0};return l[2]!==void 0&&(Je.password=l[2]),L=new rt({props:Je}),ge.push(()=>we(L,"password",mt)),{c(){e=v("label"),t=G("Application"),s=O(),n=v("input"),r=O(),o=v("label"),f=G("Username"),i=O(),u=v("input"),h=O(),a=v("div"),g=v("label"),c=G("Password"),y=O(),W(L.$$.fragment),D=O(),p=v("div"),U=v("label"),P=G("Symbols?"),A=O(),k=v("input"),x=O(),w=v("label"),S=G("Exclude Similar?"),H=O(),R=v("input"),N=O(),Y=v("label"),ke=G("Exclude Ambiguous?"),Ie=O(),ee=v("input"),Ae=O(),re=v("div"),Q=v("input"),ye=O(),oe=v("button"),De=G("Generate"),he=O(),te=v("button"),$e=G("Add"),this.h()},l(b){e=E(b,"LABEL",{for:!0});var B=I(e);t=z(B,"Application"),B.forEach(m),s=V(b),n=E(b,"INPUT",{id:!0,class:!0,type:!0,placeholder:!0}),r=V(b),o=E(b,"LABEL",{for:!0});var de=I(o);f=z(de,"Username"),de.forEach(m),i=V(b),u=E(b,"INPUT",{id:!0,class:!0,type:!0,placeholder:!0}),h=V(b),a=E(b,"DIV",{});var ue=I(a);g=E(ue,"LABEL",{for:!0});var We=I(g);c=z(We,"Password"),We.forEach(m),y=V(ue),q(L.$$.fragment,ue),D=V(ue),p=E(ue,"DIV",{});var J=I(p);U=E(J,"LABEL",{for:!0});var qe=I(U);P=z(qe,"Symbols?"),qe.forEach(m),A=V(J),k=E(J,"INPUT",{id:!0,type:!0,class:!0,placeholder:!0}),x=V(J),w=E(J,"LABEL",{for:!0});var Fe=I(w);S=z(Fe,"Exclude Similar?"),Fe.forEach(m),H=V(J),R=E(J,"INPUT",{id:!0,type:!0,class:!0,placeholder:!0}),N=V(J),Y=E(J,"LABEL",{for:!0});var Xe=I(Y);ke=z(Xe,"Exclude Ambiguous?"),Xe.forEach(m),Ie=V(J),ee=E(J,"INPUT",{id:!0,type:!0,class:!0,placeholder:!0}),Ae=V(J),re=E(J,"DIV",{class:!0});var me=I(re);Q=E(me,"INPUT",{id:!0,class:!0,type:!0,minlength:!0,placeholder:!0}),ye=V(me),oe=E(me,"BUTTON",{class:!0});var Ke=I(oe);De=z(Ke,"Generate"),Ke.forEach(m),me.forEach(m),J.forEach(m),ue.forEach(m),he=V(b),te=E(b,"BUTTON",{class:!0});var Ye=I(te);$e=z(Ye,"Add"),Ye.forEach(m),this.h()},h(){d(e,"for","application"),d(n,"id","application"),d(n,"class","input"),d(n,"type","text"),d(n,"placeholder","Application"),d(o,"for","username"),d(u,"id","username"),d(u,"class","input"),d(u,"type","text"),d(u,"placeholder","Username"),d(g,"for","password"),d(U,"for","includeSymbols"),d(k,"id","includeSymbols"),d(k,"type","checkbox"),d(k,"class","checkbox"),d(k,"placeholder","Length"),d(w,"for","excludeSimilarCharacters"),d(R,"id","excludeSimilarCharacters"),d(R,"type","checkbox"),d(R,"class","checkbox"),d(R,"placeholder","Length"),d(Y,"for","excludeAmbiguousCharacters"),d(ee,"id","excludeAmbiguousCharacters"),d(ee,"type","checkbox"),d(ee,"class","checkbox"),d(ee,"placeholder","Length"),d(Q,"id","length"),d(Q,"class","input"),d(Q,"type","number"),d(Q,"minlength","6"),d(Q,"placeholder","Length"),d(oe,"class","btn primary"),d(re,"class","flex"),d(te,"class","btn primary mt-6"),te.disabled=pe=!l[0]||!l[1]||!l[2]},m(b,B){T(b,e,B),_(e,t),T(b,s,B),T(b,n,B),K(n,l[0]),T(b,r,B),T(b,o,B),_(o,f),T(b,i,B),T(b,u,B),K(u,l[1]),T(b,h,B),T(b,a,B),_(a,g),_(g,c),_(a,y),F(L,a,null),_(a,D),_(a,p),_(p,U),_(U,P),_(p,A),_(p,k),k.checked=l[4],_(p,x),_(p,w),_(w,S),_(p,H),_(p,R),R.checked=l[5],_(p,N),_(p,Y),_(Y,ke),_(p,Ie),_(p,ee),ee.checked=l[6],_(p,Ae),_(p,re),_(re,Q),K(Q,l[3]),_(re,ye),_(re,oe),_(oe,De),T(b,he,B),T(b,te,B),_(te,$e),fe=!0,Se||(He=[M(n,"input",l[10]),M(u,"input",l[11]),M(k,"change",l[13]),M(R,"change",l[14]),M(ee,"change",l[15]),M(Q,"input",l[16]),M(oe,"click",l[8]),M(te,"click",l[7])],Se=!0)},p(b,[B]){B&1&&n.value!==b[0]&&K(n,b[0]),B&2&&u.value!==b[1]&&K(u,b[1]);const de={};!$&&B&4&&($=!0,de.password=b[2],be(()=>$=!1)),L.$set(de),B&16&&(k.checked=b[4]),B&32&&(R.checked=b[5]),B&64&&(ee.checked=b[6]),B&8&&xe(Q.value)!==b[3]&&K(Q,b[3]),(!fe||B&7&&pe!==(pe=!b[0]||!b[1]||!b[2]))&&(te.disabled=pe)},i(b){fe||(C(L.$$.fragment,b),fe=!0)},o(b){j(L.$$.fragment,b),fe=!1},d(b){b&&m(e),b&&m(s),b&&m(n),b&&m(r),b&&m(o),b&&m(i),b&&m(u),b&&m(h),b&&m(a),X(L),b&&m(he),b&&m(te),Se=!1,_e(He)}}}function ll(l,e,t){let{url:s=""}=e,{onAdd:n=()=>{}}=e,r,o;function f(){Tt(s,r,o),n()}let i=16,u=!0,h=!1,a=!1;function g(){t(2,o=Xt({length:i,includeSymbols:u,excludeSimilarCharacters:h,excludeAmbiguousCharacters:a}))}function c(){s=this.value,t(0,s)}function y(){r=this.value,t(1,r)}function L(P){o=P,t(2,o)}function $(){u=this.checked,t(4,u)}function D(){h=this.checked,t(5,h)}function p(){a=this.checked,t(6,a)}function U(){i=xe(this.value),t(3,i)}return l.$$set=P=>{"url"in P&&t(0,s=P.url),"onAdd"in P&&t(9,n=P.onAdd)},[s,r,o,i,u,h,a,f,g,n,c,y,L,$,D,p,U]}class sl extends le{constructor(e){super();se(this,e,ll,tl,ne,{url:0,onAdd:9})}}function ot(l,e,t){const s=l.slice();return s[15]=e[t][0],s[16]=e[t][1],s}function at(l,e,t){const s=l.slice();return s[19]=e[t],s}function nl(l){let e,t;return e=new sl({props:{onAdd:l[9]}}),{c(){W(e.$$.fragment)},l(s){q(e.$$.fragment,s)},m(s,n){F(e,s,n),t=!0},p(s,n){const r={};n&2&&(r.onAdd=s[9]),e.$set(r)},i(s){t||(C(e.$$.fragment,s),t=!0)},o(s){j(e.$$.fragment,s),t=!1},d(s){X(e,s)}}}function rl(l){let e,t;return{c(){e=v("h3"),t=G("Add Password"),this.h()},l(s){e=E(s,"H3",{slot:!0});var n=I(e);t=z(n,"Add Password"),n.forEach(m),this.h()},h(){d(e,"slot","title")},m(s,n){T(s,e,n),_(e,t)},d(s){s&&m(e)}}}function ol(l){var y,L;let e,t,s=((y=l[5])==null?void 0:y.url)+"",n,r,o=((L=l[5])==null?void 0:L.username)+"",f,i,u,h,a,g,c;return{c(){e=v("p"),t=G("Delete "),n=G(s),r=O(),f=G(o),i=G(" Password?"),u=O(),h=v("button"),a=G("Delete"),this.h()},l($){e=E($,"P",{class:!0});var D=I(e);t=z(D,"Delete "),n=z(D,s),r=V(D),f=z(D,o),i=z(D," Password?"),D.forEach(m),u=V($),h=E($,"BUTTON",{class:!0});var p=I(h);a=z(p,"Delete"),p.forEach(m),this.h()},h(){d(e,"class","mb-2"),d(h,"class","btn danger")},m($,D){T($,e,D),_(e,t),_(e,n),_(e,r),_(e,f),_(e,i),T($,u,D),T($,h,D),_(h,a),g||(c=M(h,"click",function(){Le(l[3])&&l[3].apply(this,arguments)}),g=!0)},p($,D){var p,U;l=$,D&32&&s!==(s=((p=l[5])==null?void 0:p.url)+"")&&ve(n,s),D&32&&o!==(o=((U=l[5])==null?void 0:U.username)+"")&&ve(f,o)},d($){$&&m(e),$&&m(u),$&&m(h),g=!1,c()}}}function al(l){let e,t;return{c(){e=v("h3"),t=G("Deleting Password"),this.h()},l(s){e=E(s,"H3",{slot:!0});var n=I(e);t=z(n,"Deleting Password"),n.forEach(m),this.h()},h(){d(e,"slot","title")},m(s,n){T(s,e,n),_(e,t)},d(s){s&&m(e)}}}function ut(l){let e,t;return e=new Ft({props:{id:l[19].id,url:l[15],username:l[19].username,password:l[19].password,onDelete:l[4]}}),{c(){W(e.$$.fragment)},l(s){q(e.$$.fragment,s)},m(s,n){F(e,s,n),t=!0},p(s,n){const r={};n&65&&(r.id=s[19].id),n&64&&(r.url=s[15]),n&65&&(r.username=s[19].username),n&65&&(r.password=s[19].password),n&16&&(r.onDelete=s[4]),e.$set(r)},i(s){t||(C(e.$$.fragment,s),t=!0)},o(s){j(e.$$.fragment,s),t=!1},d(s){X(e,s)}}}function it(l){let e,t,s=l[15]+"",n,r,o,f,i=l[16].filter(l[14]),u=[];for(let a=0;a<i.length;a+=1)u[a]=ut(at(l,i,a));const h=a=>j(u[a],1,1,()=>{u[a]=null});return{c(){e=v("h2"),t=G("Application: "),n=G(s),r=O();for(let a=0;a<u.length;a+=1)u[a].c();o=et(),this.h()},l(a){e=E(a,"H2",{class:!0});var g=I(e);t=z(g,"Application: "),n=z(g,s),g.forEach(m),r=V(a);for(let c=0;c<u.length;c+=1)u[c].l(a);o=et(),this.h()},h(){d(e,"class","mt-2")},m(a,g){T(a,e,g),_(e,t),_(e,n),T(a,r,g);for(let c=0;c<u.length;c+=1)u[c].m(a,g);T(a,o,g),f=!0},p(a,g){if((!f||g&64)&&s!==(s=a[15]+"")&&ve(n,s),g&81){i=a[16].filter(a[14]);let c;for(c=0;c<i.length;c+=1){const y=at(a,i,c);u[c]?(u[c].p(y,g),C(u[c],1)):(u[c]=ut(y),u[c].c(),C(u[c],1),u[c].m(o.parentNode,o))}for(Ne(),c=i.length;c<u.length;c+=1)h(c);Ce()}},i(a){if(!f){for(let g=0;g<i.length;g+=1)C(u[g]);f=!0}},o(a){u=u.filter(Boolean);for(let g=0;g<u.length;g+=1)j(u[g]);f=!1},d(a){a&&m(e),a&&m(r),tt(u,a),a&&m(o)}}}function ul(l){let e,t,s,n,r,o,f,i,u,h,a,g,c,y,L,$;function D(w){l[10](w)}let p={$$slots:{title:[rl],default:[nl]},$$scope:{ctx:l}};l[1]!==void 0&&(p.open=l[1]),e=new nt({props:p}),ge.push(()=>we(e,"open",D));function U(w){l[11](w)}let P={$$slots:{title:[al],default:[ol]},$$scope:{ctx:l}};l[2]!==void 0&&(P.open=l[2]),n=new nt({props:P}),ge.push(()=>we(n,"open",U));let A=Object.entries(l[6]),k=[];for(let w=0;w<A.length;w+=1)k[w]=it(ot(l,A,w));const x=w=>j(k[w],1,1,()=>{k[w]=null});return{c(){W(e.$$.fragment),s=O(),W(n.$$.fragment),o=O(),f=v("div"),i=v("button"),u=G("Add Password"),h=O(),a=v("input"),g=O(),c=v("div");for(let w=0;w<k.length;w+=1)k[w].c();this.h()},l(w){q(e.$$.fragment,w),s=V(w),q(n.$$.fragment,w),o=V(w),f=E(w,"DIV",{class:!0});var S=I(f);i=E(S,"BUTTON",{class:!0});var H=I(i);u=z(H,"Add Password"),H.forEach(m),h=V(S),a=E(S,"INPUT",{class:!0,type:!0,placeholder:!0}),g=V(S),c=E(S,"DIV",{});var R=I(c);for(let N=0;N<k.length;N+=1)k[N].l(R);R.forEach(m),S.forEach(m),this.h()},h(){d(i,"class","btn primary"),d(a,"class","input my-2"),d(a,"type","text"),d(a,"placeholder","Search..."),d(f,"class","container mx-auto p-4 mt-4 mb-8 bg-white")},m(w,S){F(e,w,S),T(w,s,S),F(n,w,S),T(w,o,S),T(w,f,S),_(f,i),_(i,u),_(f,h),_(f,a),K(a,l[0]),_(f,g),_(f,c);for(let H=0;H<k.length;H+=1)k[H].m(c,null);y=!0,L||($=[M(i,"click",l[12]),M(a,"input",l[13])],L=!0)},p(w,[S]){const H={};S&4194306&&(H.$$scope={dirty:S,ctx:w}),!t&&S&2&&(t=!0,H.open=w[1],be(()=>t=!1)),e.$set(H);const R={};if(S&4194344&&(R.$$scope={dirty:S,ctx:w}),!r&&S&4&&(r=!0,R.open=w[2],be(()=>r=!1)),n.$set(R),S&1&&a.value!==w[0]&&K(a,w[0]),S&81){A=Object.entries(w[6]);let N;for(N=0;N<A.length;N+=1){const Y=ot(w,A,N);k[N]?(k[N].p(Y,S),C(k[N],1)):(k[N]=it(Y),k[N].c(),C(k[N],1),k[N].m(c,null))}for(Ne(),N=A.length;N<k.length;N+=1)x(N);Ce()}},i(w){if(!y){C(e.$$.fragment,w),C(n.$$.fragment,w);for(let S=0;S<A.length;S+=1)C(k[S]);y=!0}},o(w){j(e.$$.fragment,w),j(n.$$.fragment,w),k=k.filter(Boolean);for(let S=0;S<k.length;S+=1)j(k[S]);y=!1},d(w){X(e,w),w&&m(s),X(n,w),w&&m(o),w&&m(f),tt(k,w),L=!1,_e($)}}}function il(l,e,t){let s,n,r,o,f;Be(l,Ot,p=>t(8,o=p)),Be(l,Vt,p=>t(6,f=p));let i="",u=!1,h,a=!1;const g=()=>t(1,u=!1);function c(p){u=p,t(1,u)}function y(p){a=p,t(2,a),t(7,h)}const L=()=>t(1,u=!u);function $(){i=this.value,t(0,i)}const D=p=>i?It(i,p.username):!0;return l.$$.update=()=>{l.$$.dirty&128&&t(3,r=()=>{Lt(h),t(7,h=void 0),t(2,a=!1)}),l.$$.dirty&384&&t(5,s=o[h])},t(4,n=p=>{t(7,h=p),t(2,a=!0)}),[i,u,a,r,n,s,f,h,o,g,c,y,L,$,D]}class fl extends le{constructor(e){super();se(this,e,il,ul,ne,{})}}function dl(l){let e;return{c(){e=v("div"),this.h()},l(t){e=E(t,"DIV",{id:!0}),I(e).forEach(m),this.h()},h(){d(e,"id","remote-storage-widget")},m(t,s){T(t,e,s)},p:ce,i:ce,o:ce,d(t){t&&m(e)}}}function cl(l,e,t){let{element:s=void 0}=e,{widget:n=void 0}=e;return At(()=>{$t(()=>import("../chunks/widget-3e963cc8.js").then(function(r){return r.w}),[]).then(({default:r})=>{const o=new r(ie);o.attach("remote-storage-widget"),function f(){o.rsWidget?(t(1,n=o),t(0,s=o.rsWidget)):setTimeout(f,1e3)}()})}),l.$$set=r=>{"element"in r&&t(0,s=r.element),"widget"in r&&t(1,n=r.widget)},[s,n]}class hl extends le{constructor(e){super();se(this,e,cl,dl,ne,{element:0,widget:1})}}var ft;(function(l){l.Success="success",l.Error="error",l.Info="info",l.Warning="warning"})(ft||(ft={}));const dt=Qe([]),pl=dt;function ml(l){dt.update(e=>{const t=e.findIndex(s=>s.id===l);return t===-1||e.splice(t,1),e})}function ct(l,e,t){const s=l.slice();return s[2]=e[t],s}function ht(l){let e,t,s,n;return{c(){e=v("div"),t=je("svg"),s=je("path"),n=je("path"),this.h()},l(r){e=E(r,"DIV",{class:!0});var o=I(e);t=Me(o,"svg",{width:!0,height:!0,viewBox:!0,class:!0,fill:!0,xmlns:!0});var f=I(t);s=Me(f,"path",{"fill-rule":!0,d:!0}),I(s).forEach(m),n=Me(f,"path",{"fill-rule":!0,d:!0}),I(n).forEach(m),f.forEach(m),o.forEach(m),this.h()},h(){d(s,"fill-rule","evenodd"),d(s,"d","M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"),d(n,"fill-rule","evenodd"),d(n,"d","M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"),d(t,"width","1.8em"),d(t,"height","1.8em"),d(t,"viewBox","0 0 16 16"),d(t,"class","bi bi-x"),d(t,"fill","currentColor"),d(t,"xmlns","http://www.w3.org/2000/svg"),d(e,"class","text-red-500 rounded-full bg-white mr-3")},m(r,o){T(r,e,o),_(e,t),_(t,s),_(t,n)},d(r){r&&m(e)}}}function pt(l,e){let t,s,n,r=e[2].message+"",o,f,i,u,h=e[2].type==="error"&&ht();function a(){return e[1](e[2])}return{key:l,first:null,c(){t=v("div"),h&&h.c(),s=O(),n=v("div"),o=G(r),f=O(),this.h()},l(g){t=E(g,"DIV",{class:!0});var c=I(t);h&&h.l(c),s=V(c),n=E(c,"DIV",{class:!0});var y=I(n);o=z(y,r),y.forEach(m),f=V(c),c.forEach(m),this.h()},h(){d(n,"class","text-white max-w-xs "),d(t,"class","flex items-center py-2 px-3 shadow-md mb-2 cursor-pointer"),Z(t,"bg-green-500",e[2].type==="success"),Z(t,"bg-red-500",e[2].type==="error"),this.first=t},m(g,c){T(g,t,c),h&&h.m(t,null),_(t,s),_(t,n),_(n,o),_(t,f),i||(u=M(t,"click",a),i=!0)},p(g,c){e=g,e[2].type==="error"?h||(h=ht(),h.c(),h.m(t,s)):h&&(h.d(1),h=null),c&1&&r!==(r=e[2].message+"")&&ve(o,r),c&1&&Z(t,"bg-green-500",e[2].type==="success"),c&1&&Z(t,"bg-red-500",e[2].type==="error")},d(g){g&&m(t),h&&h.d(),i=!1,u()}}}function _l(l){let e,t=[],s=new Map,n=l[0];const r=o=>o[2].id.toString();for(let o=0;o<n.length;o+=1){let f=ct(l,n,o),i=r(f);s.set(i,t[o]=pt(i,f))}return{c(){e=v("div");for(let o=0;o<t.length;o+=1)t[o].c();this.h()},l(o){e=E(o,"DIV",{class:!0});var f=I(e);for(let i=0;i<t.length;i+=1)t[i].l(f);f.forEach(m),this.h()},h(){d(e,"class","p-2 absolute bottom-0 w-full")},m(o,f){T(o,e,f);for(let i=0;i<t.length;i+=1)t[i].m(e,null)},p(o,[f]){f&1&&(n=o[0],t=yt(t,f,r,1,o,n,s,e,Dt,pt,null,ct))},i:ce,o:ce,d(o){o&&m(e);for(let f=0;f<t.length;f+=1)t[f].d()}}}function gl(l,e,t){let s;return Be(l,pl,r=>t(0,s=r)),[s,r=>ml(r.id)]}class wl extends le{constructor(e){super();se(this,e,gl,_l,ne,{})}}function bl(l){let e,t,s,n,r,o,f,i;const u=l[1].default,h=Oe(u,l,l[0],null);return r=new hl({}),f=new wl({}),{c(){e=v("div"),t=v("div"),h&&h.c(),s=O(),n=v("div"),W(r.$$.fragment),o=O(),W(f.$$.fragment),this.h()},l(a){e=E(a,"DIV",{class:!0});var g=I(e);t=E(g,"DIV",{class:!0});var c=I(t);h&&h.l(c),c.forEach(m),s=V(g),n=E(g,"DIV",{class:!0});var y=I(n);q(r.$$.fragment,y),y.forEach(m),o=V(g),q(f.$$.fragment,g),g.forEach(m),this.h()},h(){d(t,"class","flex flex-col flex-grow"),d(n,"class","absolute left-0 bottom-0 z-20"),d(e,"class","h-screen w-screen bg-gray-200 flex")},m(a,g){T(a,e,g),_(e,t),h&&h.m(t,null),_(e,s),_(e,n),F(r,n,null),_(e,o),F(f,e,null),i=!0},p(a,[g]){h&&h.p&&(!i||g&1)&&Ve(h,u,a,a[0],i?Ue(u,a[0],g,null):Te(a[0]),null)},i(a){i||(C(h,a),C(r.$$.fragment,a),C(f.$$.fragment,a),i=!0)},o(a){j(h,a),j(r.$$.fragment,a),j(f.$$.fragment,a),i=!1},d(a){a&&m(e),h&&h.d(a),X(r),X(f)}}}function vl(l,e,t){let{$$slots:s={},$$scope:n}=e;return l.$$set=r=>{"$$scope"in r&&t(0,n=r.$$scope)},[n,s]}class El extends le{constructor(e){super();se(this,e,vl,bl,ne,{})}}function kl(l){let e,t;return e=new fl({}),{c(){W(e.$$.fragment)},l(s){q(e.$$.fragment,s)},m(s,n){F(e,s,n),t=!0},i(s){t||(C(e.$$.fragment,s),t=!0)},o(s){j(e.$$.fragment,s),t=!1},d(s){X(e,s)}}}function Il(l){let e,t;return e=new El({props:{$$slots:{default:[kl]},$$scope:{ctx:l}}}),{c(){W(e.$$.fragment)},l(s){q(e.$$.fragment,s)},m(s,n){F(e,s,n),t=!0},p(s,[n]){const r={};n&1&&(r.$$scope={dirty:n,ctx:s}),e.$set(r)},i(s){t||(C(e.$$.fragment,s),t=!0)},o(s){j(e.$$.fragment,s),t=!1},d(s){X(e,s)}}}class Dl extends le{constructor(e){super();se(this,e,null,Il,ne,{})}}export{Dl as default};
