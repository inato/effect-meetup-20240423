const __vite__fileDeps=["assets/slidev/DrawingControls-CNqgXyfZ.js","assets/modules/unplugin-icons-bSfrw-za.js","assets/modules/vue-qWq99jFA.js","assets/modules/shiki-vLrfgAos.js","assets/modules/shiki-BSchMNmt.css","assets/slidev/DrawingPreview-D3vX_Jb5.js","assets/index-DSQt_1EX.js","assets/index-G-F5D02L.css","assets/DrawingPreview-DuMvmfcQ.css","assets/slidev/ContextMenu-CyJ2IYfU.js","assets/slidev/IconButton-CqIQeW_E.js","assets/slidev/context-GeA1e0Jg.js","assets/ContextMenu-B2yN4Cp6.css","assets/DrawingControls-C5T1oZL5.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_ as g,c as k,k as C,q as S,v as D,w as j,x as B,a as I,y as A,z as U,A as O,B as R,D as H,E as T}from"../index-DSQt_1EX.js";import{d as y,a7 as P,o as s,c as r,A as e,b as _,e as n,f as L,i as M,g as i,ag as W,y as z,k as x,af as w,a6 as E,M as b,l as p,F as $,x as N,v as F,t as G,h as Q}from"../modules/vue-qWq99jFA.js";import{Q as q,G as K,C as X,r as Y,u as J,S as Z,N as ee,o as te}from"./ContextMenu-CyJ2IYfU.js";import{c as se,a as oe}from"./DrawingPreview-D3vX_Jb5.js";import"../modules/shiki-vLrfgAos.js";import"../modules/unplugin-icons-bSfrw-za.js";import"./IconButton-CqIQeW_E.js";import"./context-GeA1e0Jg.js";const le="/effect-meetup-20240423/assets/logo-BYkHSa_O.png",ae={key:0,class:"fixed top-0 bottom-0 left-0 right-0 grid z-20"},ne=y({__name:"Modal",props:{modelValue:{default:!1},class:{default:""}},emits:["update:modelValue"],setup(c,{emit:l}){const a=c,t=P(a,"modelValue",l);function o(){t.value=!1}return(f,u)=>(s(),r(W,null,[e(t)?(s(),_("div",ae,[n("div",{bg:"black opacity-80",class:"absolute top-0 bottom-0 left-0 right-0 -z-1",onClick:u[0]||(u[0]=v=>o())}),n("div",{class:M(["m-auto rounded-md bg-main shadow",a.class]),"dark:border":"~ main"},[L(f.$slots,"default")],2)])):i("v-if",!0)],1024))}}),ie=g(ne,[["__file","/Users/jeremie/work/presentations/effect-meetup-20240423/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.9/node_modules/@slidev/client/internals/Modal.vue"]]),re={class:"slidev-info-dialog slidev-layout flex flex-col gap-4 text-base"},de=["innerHTML"],ue=n("a",{href:"https://github.com/slidevjs/slidev",target:"_blank",class:"!opacity-100 !border-none !text-current"},[n("div",{class:"flex gap-1 children:my-auto"},[n("div",{class:"opacity-50 text-sm mr-2"},"Powered by"),n("img",{class:"w-5 h-5",src:le,alt:"Slidev logo"}),n("div",{style:{color:"#2082A6"}},[n("b",null,"Sli"),E("dev ")])])],-1),ce=y({__name:"InfoDialog",props:{modelValue:{default:!1}},emits:["update:modelValue"],setup(c,{emit:l}){const t=P(c,"modelValue",l),o=z(()=>typeof k.info=="string");return(f,u)=>(s(),r(ie,{modelValue:e(t),"onUpdate:modelValue":u[0]||(u[0]=v=>w(t)?t.value=v:null),class:"px-6 py-4"},{default:x(()=>[n("div",re,[o.value?(s(),_("div",{key:0,class:"mb-4",innerHTML:e(k).info},null,8,de)):i("v-if",!0),ue])]),_:1},8,["modelValue"]))}}),me=g(ce,[["__file","/Users/jeremie/work/presentations/effect-meetup-20240423/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.9/node_modules/@slidev/client/internals/InfoDialog.vue"]]),pe=y({__name:"Controls",setup(c){const l=b(),a=b();return(d,t)=>(s(),_($,null,[p(q,{modelValue:e(C),"onUpdate:modelValue":t[0]||(t[0]=o=>w(C)?C.value=o:null)},null,8,["modelValue"]),p(K),l.value?(s(),r(e(l),{key:0})):i("v-if",!0),a.value?(s(),r(e(a),{key:1,modelValue:e(S),"onUpdate:modelValue":t[1]||(t[1]=o=>w(S)?S.value=o:null)},null,8,["modelValue"])):i("v-if",!0),e(k).info?(s(),r(me,{key:2,modelValue:e(D),"onUpdate:modelValue":t[2]||(t[2]=o=>w(D)?D.value=o:null)},null,8,["modelValue"])):i("v-if",!0),p(X)],64))}}),fe=g(pe,[["__file","/Users/jeremie/work/presentations/effect-meetup-20240423/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.9/node_modules/@slidev/client/internals/Controls.vue"]]),ve=y({__name:"PrintStyle",setup(c){function l(a,{slots:d}){if(d.default)return F("style",d.default())}return(a,d)=>(s(),r(l,null,{default:x(()=>[E(" @page { size: "+N(e(j))+"px "+N(e(B))+"px; margin: 0px; } ",1)]),_:1}))}}),_e=g(ve,[["__file","/Users/jeremie/work/presentations/effect-meetup-20240423/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.9/node_modules/@slidev/client/internals/PrintStyle.vue"]]),ge=y({__name:"play",setup(c){Y();const{next:l,prev:a,isEmbedded:d,isPrintMode:t}=I(),{isDrawing:o}=se(),f=G();function u(m){var V;U.value||m.button===0&&((V=m.target)==null?void 0:V.id)==="slide-container"&&(m.pageX/window.innerWidth>.6?l():a())}J(f);const v=z(()=>A.value||U.value);b();const h=b();return O(()=>import("./DrawingControls-CNqgXyfZ.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13])).then(m=>h.value=m.default),(m,V)=>(s(),_($,null,[e(t)?(s(),r(_e,{key:0})):i("v-if",!0),n("div",{id:"page-root",ref_key:"root",ref:f,class:M(["grid",e(T)?"grid-rows-[1fr_max-content]":"grid-cols-[1fr_max-content]"])},[p(oe,{class:"w-full h-full",style:Q({background:"var(--slidev-slide-container-background, black)"}),width:e(t)?e(R).width.value:void 0,scale:e(H),"is-main":!0,onPointerdown:u,onContextmenu:e(te)},{default:x(()=>[p(Z,{"render-context":"slide"})]),controls:x(()=>[e(t)?i("v-if",!0):(s(),_("div",{key:0,class:M(["absolute bottom-0 left-0 transition duration-300 opacity-0 hover:opacity-100",[v.value?"!opacity-100 right-0":"opacity-0 p-2",e(o)?"pointer-events-none":""]])},[p(ee,{class:"m-auto",persist:v.value},null,8,["persist"])],2)),!e(k).drawings.presenterOnly&&!e(d)&&h.value?(s(),r(e(h),{key:1,class:"ml-0"})):i("v-if",!0)]),_:1},8,["style","width","scale","onContextmenu"]),i("v-if",!0)],2),e(t)?i("v-if",!0):(s(),r(fe,{key:1}))],64))}}),Se=g(ge,[["__file","/Users/jeremie/work/presentations/effect-meetup-20240423/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.9/node_modules/@slidev/client/pages/play.vue"]]);export{Se as default};
