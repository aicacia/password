import{S as R,i as O,s as G,Q as K,t as T,R as Q,a as $,h as j,d as h,g as D,M as g,j as ve,I as be,l as de,b as d,J as we,K as ye,L as ke,q as w,o as y,H as Be,C,w as V,x as M,y as L,z as ne,A as ae,B as S,P as F,E as X,T as le,e as E,k as H,c as x,m as J,U as P,V as Ce,n as Ee,p as xe,a9 as De,aa as Ve,ab as Me,_ as Le,ac as Se,ad as Ae,a5 as qe,a7 as Ne,ae as Pe}from"./index-919745c3.js";import{w as Te}from"./index-4459df0c.js";function _e(s,e,n=!1){const t=e.length,r=s.length;return r>t?!1:je(n!==!0?s.toLowerCase():s,r,n!==!0?e.toLowerCase():e,t)}function je(s,e,n,t){let r=0,a=0;e:for(;r<e;){const i=s.charAt(r++);for(;a<t;)if(n.charAt(a++)===i)continue e;return!1}return!0}function Et(s,e){return _e(e,s.application)||_e(e,s.username)}function Fe(s){try{const e=new URL(s),n=e.pathname.endsWith("/")?e.pathname.slice(0,e.pathname.length-1):e.pathname;let t=`${e.protocol}//${e.host}${n}`;return e.hash&&(t+=`#${e.hash}`),e.search&&(t+=`?${e.search}`),t}catch{return}}function xt(s){return Fe(s)||s.trim()}function Re(){return Math.random().toString(36).slice(2)}function me(s){let e,n;return{c(){e=K("title"),n=T(s[0])},l(t){e=Q(t,"title",{});var r=$(e);n=j(r,s[0]),r.forEach(h)},m(t,r){D(t,e,r),g(e,n)},p(t,r){r&1&&ve(n,t[0])},d(t){t&&h(e)}}}function Oe(s){let e,n,t,r=s[0]&&me(s);const a=s[3].default,i=be(a,s,s[2],null);return{c(){e=K("svg"),r&&r.c(),n=de(),i&&i.c(),this.h()},l(l){e=Q(l,"svg",{xmlns:!0,viewBox:!0,class:!0});var o=$(e);r&&r.l(o),n=de(),i&&i.l(o),o.forEach(h),this.h()},h(){d(e,"xmlns","http://www.w3.org/2000/svg"),d(e,"viewBox",s[1]),d(e,"class","svelte-c8tyih")},m(l,o){D(l,e,o),r&&r.m(e,null),g(e,n),i&&i.m(e,null),t=!0},p(l,[o]){l[0]?r?r.p(l,o):(r=me(l),r.c(),r.m(e,n)):r&&(r.d(1),r=null),i&&i.p&&(!t||o&4)&&we(i,a,l,l[2],t?ke(a,l[2],o,null):ye(l[2]),null),(!t||o&2)&&d(e,"viewBox",l[1])},i(l){t||(w(i,l),t=!0)},o(l){y(i,l),t=!1},d(l){l&&h(e),r&&r.d(),i&&i.d(l)}}}function Ue(s,e,n){let{$$slots:t={},$$scope:r}=e,{title:a=null}=e,{viewBox:i}=e;return s.$$set=l=>{"title"in l&&n(0,a=l.title),"viewBox"in l&&n(1,i=l.viewBox),"$$scope"in l&&n(2,r=l.$$scope)},[a,i,r,t]}class se extends R{constructor(e){super(),O(this,e,Ue,Oe,G,{title:0,viewBox:1})}}const oe=Te([]),We=oe;typeof window!="undefined"&&(window.createNotification=He);function He(s,e="error",n=5e3){const t=Re();return oe.update(r=>[...r,{id:t,message:s,type:e}]),setTimeout(()=>Ie(t),n),t}function Ie(s){oe.update(e=>{const n=e.findIndex(t=>t.id===s);return n===-1||(e=e.slice(),e.splice(n,1)),e})}function ze(s){const e=s-1;return e*e*e+1}function ge(s,{delay:e=0,duration:n=400,easing:t=ze,x:r=0,y:a=0,opacity:i=0}={}){const l=getComputedStyle(s),o=+l.opacity,f=l.transform==="none"?"":l.transform,c=o*(1-i);return{delay:e,duration:n,easing:t,css:(m,k)=>`
			transform: ${f} translate(${(1-m)*r}px, ${(1-m)*a}px);
			opacity: ${o-c*k}`}}function Je(s,{from:e,to:n},t={}){const r=getComputedStyle(s),a=r.transform==="none"?"":r.transform,[i,l]=r.transformOrigin.split(" ").map(parseFloat),o=e.left+e.width*i/n.width-(n.left+i),f=e.top+e.height*l/n.height-(n.top+l),{delay:c=0,duration:m=v=>Math.sqrt(v)*120,easing:k=ze}=t;return{delay:c,duration:Be(m)?m(Math.sqrt(o*o+f*f)):m,easing:k,css:(v,b)=>{const u=b*o,p=b*f,I=v+b*e.width/n.width,q=v+b*e.height/n.height;return`transform: ${a} translate(${u}px, ${p}px) scale(${I}, ${q});`}}}function Ke(s){let e;return{c(){e=K("path"),this.h()},l(n){e=Q(n,"path",{d:!0}),$(e).forEach(h),this.h()},h(){d(e,"d","M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z")},m(n,t){D(n,e,t)},p:X,d(n){n&&h(e)}}}function Qe(s){let e,n;const t=[{viewBox:"0 0 24 24"},s[0]];let r={$$slots:{default:[Ke]},$$scope:{ctx:s}};for(let a=0;a<t.length;a+=1)r=C(r,t[a]);return e=new se({props:r}),{c(){V(e.$$.fragment)},l(a){M(e.$$.fragment,a)},m(a,i){L(e,a,i),n=!0},p(a,[i]){const l=i&1?ne(t,[t[0],ae(a[0])]):{};i&2&&(l.$$scope={dirty:i,ctx:a}),e.$set(l)},i(a){n||(w(e.$$.fragment,a),n=!0)},o(a){y(e.$$.fragment,a),n=!1},d(a){S(e,a)}}}function Ye(s,e,n){return s.$$set=t=>{n(0,e=C(C({},e),F(t)))},e=F(e),[e]}class Ge extends R{constructor(e){super(),O(this,e,Ye,Qe,G,{})}}function Xe(s){let e;return{c(){e=K("path"),this.h()},l(n){e=Q(n,"path",{d:!0}),$(e).forEach(h),this.h()},h(){d(e,"d","M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z")},m(n,t){D(n,e,t)},p:X,d(n){n&&h(e)}}}function Ze(s){let e,n;const t=[{viewBox:"0 0 24 24"},s[0]];let r={$$slots:{default:[Xe]},$$scope:{ctx:s}};for(let a=0;a<t.length;a+=1)r=C(r,t[a]);return e=new se({props:r}),{c(){V(e.$$.fragment)},l(a){M(e.$$.fragment,a)},m(a,i){L(e,a,i),n=!0},p(a,[i]){const l=i&1?ne(t,[t[0],ae(a[0])]):{};i&2&&(l.$$scope={dirty:i,ctx:a}),e.$set(l)},i(a){n||(w(e.$$.fragment,a),n=!0)},o(a){y(e.$$.fragment,a),n=!1},d(a){S(e,a)}}}function et(s,e,n){return s.$$set=t=>{n(0,e=C(C({},e),F(t)))},e=F(e),[e]}class tt extends R{constructor(e){super(),O(this,e,et,Ze,G,{})}}function nt(s){let e;return{c(){e=K("path"),this.h()},l(n){e=Q(n,"path",{d:!0}),$(e).forEach(h),this.h()},h(){d(e,"d","M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z")},m(n,t){D(n,e,t)},p:X,d(n){n&&h(e)}}}function at(s){let e,n;const t=[{viewBox:"0 0 24 24"},s[0]];let r={$$slots:{default:[nt]},$$scope:{ctx:s}};for(let a=0;a<t.length;a+=1)r=C(r,t[a]);return e=new se({props:r}),{c(){V(e.$$.fragment)},l(a){M(e.$$.fragment,a)},m(a,i){L(e,a,i),n=!0},p(a,[i]){const l=i&1?ne(t,[t[0],ae(a[0])]):{};i&2&&(l.$$scope={dirty:i,ctx:a}),e.$set(l)},i(a){n||(w(e.$$.fragment,a),n=!0)},o(a){y(e.$$.fragment,a),n=!1},d(a){S(e,a)}}}function st(s,e,n){return s.$$set=t=>{n(0,e=C(C({},e),F(t)))},e=F(e),[e]}class rt extends R{constructor(e){super(),O(this,e,st,at,G,{})}}function it(s){let e;return{c(){e=K("path"),this.h()},l(n){e=Q(n,"path",{d:!0}),$(e).forEach(h),this.h()},h(){d(e,"d","M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z")},m(n,t){D(n,e,t)},p:X,d(n){n&&h(e)}}}function lt(s){let e,n;const t=[{viewBox:"0 0 24 24"},s[0]];let r={$$slots:{default:[it]},$$scope:{ctx:s}};for(let a=0;a<t.length;a+=1)r=C(r,t[a]);return e=new se({props:r}),{c(){V(e.$$.fragment)},l(a){M(e.$$.fragment,a)},m(a,i){L(e,a,i),n=!0},p(a,[i]){const l=i&1?ne(t,[t[0],ae(a[0])]):{};i&2&&(l.$$scope={dirty:i,ctx:a}),e.$set(l)},i(a){n||(w(e.$$.fragment,a),n=!0)},o(a){y(e.$$.fragment,a),n=!1},d(a){S(e,a)}}}function ot(s,e,n){return s.$$set=t=>{n(0,e=C(C({},e),F(t)))},e=F(e),[e]}class ct extends R{constructor(e){super(),O(this,e,ot,lt,G,{})}}function ft(s){let e,n;return e=new ct({}),{c(){V(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,r){L(e,t,r),n=!0},i(t){n||(w(e.$$.fragment,t),n=!0)},o(t){y(e.$$.fragment,t),n=!1},d(t){S(e,t)}}}function ut(s){let e,n;return e=new rt({}),{c(){V(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,r){L(e,t,r),n=!0},i(t){n||(w(e.$$.fragment,t),n=!0)},o(t){y(e.$$.fragment,t),n=!1},d(t){S(e,t)}}}function ht(s){let e,n;return e=new tt({}),{c(){V(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,r){L(e,t,r),n=!0},i(t){n||(w(e.$$.fragment,t),n=!0)},o(t){y(e.$$.fragment,t),n=!1},d(t){S(e,t)}}}function dt(s){let e,n;return e=new Ge({}),{c(){V(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,r){L(e,t,r),n=!0},i(t){n||(w(e.$$.fragment,t),n=!0)},o(t){y(e.$$.fragment,t),n=!1},d(t){S(e,t)}}}function _t(s){let e,n,t,r,a,i,l=s[0].message+"",o,f,c,m;const k=[dt,ht,ut,ft],v=[];function b(u,p){return u[0].type==="error"?0:u[0].type==="success"?1:u[0].type==="info"?2:u[0].type==="warning"?3:-1}return~(t=b(s))&&(r=v[t]=k[t](s)),{c(){e=E("div"),n=E("div"),r&&r.c(),a=H(),i=E("div"),o=T(l),this.h()},l(u){e=x(u,"DIV",{class:!0});var p=$(e);n=x(p,"DIV",{class:!0});var I=$(n);r&&r.l(I),I.forEach(h),a=J(p),i=x(p,"DIV",{class:!0});var q=$(i);o=j(q,l),q.forEach(h),p.forEach(h),this.h()},h(){d(n,"class","as-w-6 as-h-6 as-mr-2 as-text-white"),d(i,"class","as-text-white as-max-w-xs "),d(e,"class","as-flex as-items-center as-py-2 as-px-3 as-m-1 as-cursor-pointer as-shadow"),P(e,"as-bg-green-500",s[0].type==="success"),P(e,"as-bg-red-500",s[0].type==="error"),P(e,"as-bg-blue-500",s[0].type==="info"),P(e,"as-bg-yellow-500",s[0].type==="warning")},m(u,p){D(u,e,p),g(e,n),~t&&v[t].m(n,null),g(e,a),g(e,i),g(i,o),f=!0,c||(m=Ce(e,"click",s[1]),c=!0)},p(u,[p]){let I=t;t=b(u),t!==I&&(r&&(Ee(),y(v[I],1,1,()=>{v[I]=null}),xe()),~t?(r=v[t],r||(r=v[t]=k[t](u),r.c()),w(r,1),r.m(n,null)):r=null),(!f||p&1)&&l!==(l=u[0].message+"")&&ve(o,l),p&1&&P(e,"as-bg-green-500",u[0].type==="success"),p&1&&P(e,"as-bg-red-500",u[0].type==="error"),p&1&&P(e,"as-bg-blue-500",u[0].type==="info"),p&1&&P(e,"as-bg-yellow-500",u[0].type==="warning")},i(u){f||(w(r),f=!0)},o(u){y(r),f=!1},d(u){u&&h(e),~t&&v[t].d(),c=!1,m()}}}function mt(s,e,n){let{notification:t}=e;function r(){Ie(t.id)}return s.$$set=a=>{"notification"in a&&n(0,t=a.notification)},[t,r]}class gt extends R{constructor(e){super(),O(this,e,mt,_t,le,{notification:0})}}function $e(s,e,n){const t=s.slice();return t[1]=e[n],t}function pe(s,e){let n,t,r,a,i,l,o=X,f;return t=new gt({props:{notification:e[1]}}),{key:s,first:null,c(){n=E("div"),V(t.$$.fragment),r=H(),this.h()},l(c){n=x(c,"DIV",{class:!0});var m=$(n);M(t.$$.fragment,m),r=J(m),m.forEach(h),this.h()},h(){d(n,"class","as-w-full"),this.first=n},m(c,m){D(c,n,m),L(t,n,null),g(n,r),f=!0},p(c,m){e=c;const k={};m&1&&(k.notification=e[1]),t.$set(k)},r(){l=n.getBoundingClientRect()},f(){De(n),o(),Ve(n,l)},a(){o(),o=Me(n,l,Je,{})},i(c){f||(w(t.$$.fragment,c),Le(()=>{i&&i.end(1),a=Se(n,ge,{y:-64,duration:300}),a.start()}),f=!0)},o(c){y(t.$$.fragment,c),a&&a.invalidate(),i=Ae(n,ge,{y:-64,duration:300}),f=!1},d(c){c&&h(n),S(t),c&&i&&i.end()}}}function $t(s){let e,n,t=[],r=new Map,a,i=s[0];const l=o=>o[1].id;for(let o=0;o<i.length;o+=1){let f=$e(s,i,o),c=l(f);r.set(c,t[o]=pe(c,f))}return{c(){e=E("div"),n=E("div");for(let o=0;o<t.length;o+=1)t[o].c();this.h()},l(o){e=x(o,"DIV",{class:!0});var f=$(e);n=x(f,"DIV",{class:!0});var c=$(n);for(let m=0;m<t.length;m+=1)t[m].l(c);c.forEach(h),f.forEach(h),this.h()},h(){d(n,"class","as-container as-mx-auto"),d(e,"class","as-fixed as-top-0 as-left-0 as-w-full")},m(o,f){D(o,e,f),g(e,n);for(let c=0;c<t.length;c+=1)t[c].m(n,null);a=!0},p(o,[f]){if(f&1){i=o[0],Ee();for(let c=0;c<t.length;c+=1)t[c].r();t=qe(t,f,l,1,o,i,r,n,Pe,pe,null,$e);for(let c=0;c<t.length;c+=1)t[c].a();xe()}},i(o){if(!a){for(let f=0;f<i.length;f+=1)w(t[f]);a=!0}},o(o){for(let f=0;f<t.length;f+=1)y(t[f]);a=!1},d(o){o&&h(e);for(let f=0;f<t.length;f+=1)t[f].d()}}}function pt(s,e,n){let t;return Ne(s,We,r=>n(0,t=r)),[t]}class vt extends R{constructor(e){super(),O(this,e,pt,$t,le,{})}}function bt(s){let e,n,t,r,a,i,l=new Date().getFullYear()+"",o,f,c,m,k,v,b,u,p,I,q,N,re,Z,ee,U,A;const ie=s[2].default,z=be(ie,s,s[1],null);return U=new vt({}),{c(){e=E("div"),n=E("div"),t=E("div"),z&&z.c(),r=H(),a=E("div"),i=T("\xA9 "),o=T(l),f=H(),c=E("a"),m=T("https://aicacia.github.io/secret/"),v=H(),b=E("div"),u=E("a"),p=T("Privacy Policy"),q=T(`
			|
			`),N=E("a"),re=T("Terms of Service"),ee=H(),V(U.$$.fragment),this.h()},l(_){e=x(_,"DIV",{class:!0});var B=$(e);n=x(B,"DIV",{class:!0});var W=$(n);t=x(W,"DIV",{class:!0});var ce=$(t);z&&z.l(ce),ce.forEach(h),r=J(W),a=x(W,"DIV",{class:!0});var Y=$(a);i=j(Y,"\xA9 "),o=j(Y,l),f=J(Y),c=x(Y,"A",{target:!0,href:!0});var fe=$(c);m=j(fe,"https://aicacia.github.io/secret/"),fe.forEach(h),Y.forEach(h),v=J(W),b=x(W,"DIV",{class:!0});var te=$(b);u=x(te,"A",{target:!0,href:!0});var ue=$(u);p=j(ue,"Privacy Policy"),ue.forEach(h),q=j(te,`
			|
			`),N=x(te,"A",{target:!0,href:!0});var he=$(N);re=j(he,"Terms of Service"),he.forEach(h),te.forEach(h),W.forEach(h),B.forEach(h),ee=J(_),M(U.$$.fragment,_),this.h()},h(){d(t,"class","as-flex as-flex-col as-flex-grow"),d(c,"target",k=s[0]?"_blank":void 0),d(c,"href","https://aicacia.github.io/secrets/"),d(a,"class","as-text-center as-text-xs as-mt-8"),d(u,"target",I=s[0]?"_blank":void 0),d(u,"href","https://aicacia.github.io/secrets/privacy-policy"),d(N,"target",Z=s[0]?"_blank":void 0),d(N,"href","https://aicacia.github.io/secrets/terms-of-service"),d(b,"class","as-text-center as-text-xs as-my-2"),d(n,"class","as-flex as-flex-col as-w-full as-h-full"),d(e,"class","as-relative as-flex as-w-full as-h-full")},m(_,B){D(_,e,B),g(e,n),g(n,t),z&&z.m(t,null),g(n,r),g(n,a),g(a,i),g(a,o),g(a,f),g(a,c),g(c,m),g(n,v),g(n,b),g(b,u),g(u,p),g(b,q),g(b,N),g(N,re),D(_,ee,B),L(U,_,B),A=!0},p(_,[B]){z&&z.p&&(!A||B&2)&&we(z,ie,_,_[1],A?ke(ie,_[1],B,null):ye(_[1]),null),(!A||B&1&&k!==(k=_[0]?"_blank":void 0))&&d(c,"target",k),(!A||B&1&&I!==(I=_[0]?"_blank":void 0))&&d(u,"target",I),(!A||B&1&&Z!==(Z=_[0]?"_blank":void 0))&&d(N,"target",Z)},i(_){A||(w(z,_),w(U.$$.fragment,_),A=!0)},o(_){y(z,_),y(U.$$.fragment,_),A=!1},d(_){_&&h(e),z&&z.d(_),_&&h(ee),S(U,_)}}}function wt(s,e,n){let{$$slots:t={},$$scope:r}=e,{embeded:a=!1}=e;return s.$$set=i=>{"embeded"in i&&n(0,a=i.embeded),"$$scope"in i&&n(1,r=i.$$scope)},[a,r,t]}class It extends R{constructor(e){super(),O(this,e,wt,bt,le,{embeded:0})}}export{se as I,It as L,Re as a,He as b,xt as c,_e as f,Et as s};
