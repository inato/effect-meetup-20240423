import{o as a,c as t,k as l,q as e,s as n,A as h,e as i,a6 as s}from"../modules/vue-qWq99jFA.js";import{I as p}from"./default-TyIX7NaI.js";import{_ as r,av as k}from"../index-BgMWTHmE.js";import{p as d,u as g,f as y}from"./context-BLXeQ8Ou.js";import"../modules/shiki-vLrfgAos.js";const B=i("h1",null,"Helpers recap",-1),c=i("p",null,[i("code",null,"effectToFpts"),s(": translates an Effect usecase to "),i("code",null,"fp-ts")],-1),o=i("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[i("code",{class:"language-ts"},[i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#CB7676","--shiki-light":"#AB5959"}},"const "),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"effectToFpts"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," =")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"  ("),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"fun"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},","),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}}," mapping"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},")"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," =>")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"  (..."),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"args"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},")"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," =>")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"  ("),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"access"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},")"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," =>"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#CB7676","--shiki-light":"#AB5959"}},"    const "),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"effect"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," ="),i("span",{style:{"--shiki-dark":"#80A665","--shiki-light":"#59873A"}}," fun"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"(..."),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"args"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},");")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#CB7676","--shiki-light":"#AB5959"}},"    let "),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"ctx"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," ="),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}}," Context"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"."),i("span",{style:{"--shiki-dark":"#80A665","--shiki-light":"#59873A"}},"empty"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"();")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#4D9375","--shiki-light":"#1E754F"}},"    for"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," ("),i("span",{style:{"--shiki-dark":"#CB7676","--shiki-light":"#AB5959"}},"const "),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"m"),i("span",{style:{"--shiki-dark":"#CB7676","--shiki-light":"#AB5959"}}," in "),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"mapping"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},")"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"      ctx"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," ="),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}}," Context"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"."),i("span",{style:{"--shiki-dark":"#80A665","--shiki-light":"#59873A"}},"add"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"("),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"mapping"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"["),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"m"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"],"),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}}," access"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"["),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"m"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"])("),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"ctx"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},");")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"    }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#4D9375","--shiki-light":"#1E754F"}},"    return"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," ()"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," =>")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#80A665","--shiki-light":"#59873A"}},"      pipe"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"(")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"        effect"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},","),i("span",{style:{"--shiki-dark":"#CB7676","--shiki-light":"#AB5959"}}," ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"        Effect"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"."),i("span",{style:{"--shiki-dark":"#80A665","--shiki-light":"#59873A"}},"provide"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"("),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"ctx"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"),"),i("span",{style:{"--shiki-dark":"#CB7676","--shiki-light":"#AB5959"}}," ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"        Effect"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"."),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"either"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},","),i("span",{style:{"--shiki-dark":"#CB7676","--shiki-light":"#AB5959"}}," ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"        Effect"),i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"."),i("span",{style:{"--shiki-dark":"#BD976A","--shiki-light":"#B07D48"}},"runPromise")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"      );")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"  };")])])],-1),D={__name:"21",setup(A){return d(k),g(),(f,m)=>(a(),t(p,e(n(h(y)(h(k),20))),{default:l(()=>[B,c,o]),_:1},16))}},E=r(D,[["__file","/@slidev/slides/21.md"]]);export{E as default};
