import{d as f,y as m,o as c,b as p,e as r,f as _,h as v,c as h,k,q as y,s as g,A as n}from"../modules/vue-qWq99jFA.js";import{u as d,p as b,f as x}from"./context-BLXeQ8Ou.js";import{_ as u,a6 as i}from"../index-BgMWTHmE.js";import"../modules/shiki-vLrfgAos.js";function l(e){return e.startsWith("/")?"/"+e.slice(1):e}function w(e,s=!1){const t=e&&["#","rgb","hsl"].some(a=>e.indexOf(a)===0),o={background:t?e:void 0,color:e&&!t?"white":void 0,backgroundImage:t?void 0:e?s?`linear-gradient(#0005, #0008), url(${l(e)})`:`url("${l(e)}")`:void 0,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"};return o.background||delete o.background,o}const B={class:"my-auto w-full"},$=f({__name:"cover",props:{background:{default:""}},setup(e){d();const s=e,t=m(()=>w(s.background,!0));return(o,a)=>(c(),p("div",{class:"slidev-layout cover",style:v(t.value)},[r("div",B,[_(o.$slots,"default")])],4))}}),C=u($,[["__file","/Users/jeremie/work/presentations/effect-meetup-20240423/node_modules/.pnpm/@slidev+theme-default@0.25.0/node_modules/@slidev/theme-default/layouts/cover.vue"]]),P=r("h1",null,"Effect / fp-ts interoperability",-1),S=r("p",null,"A quick overview of the set of tools Inato used to migrate its codebase to Effect.",-1),z={__name:"1",setup(e){return b(i),d(),(s,t)=>(c(),h(C,y(g(n(x)(n(i),0))),{default:k(()=>[P,S]),_:1},16))}},q=u(z,[["__file","/@slidev/slides/1.md"]]);export{q as default};