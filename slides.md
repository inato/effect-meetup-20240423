---
theme: seriph
background: https://cdn.jsdelivr.net/gh/slidevjs/slidev-covers@main/static/aQcE3gDSSTY.webp
title: effect meetup 20240423

# apply any unocss classes to the current slide

class: text-center

# https://sli.dev/custom/highlighters.html

highlighter: shiki

# https://sli.dev/guide/drawing

drawings:
  persist: false

# slide transition: https://sli.dev/guide/animations#slide-transitions

transition: slide-left

# enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax

mdc: true
---

# Effect / fp-ts interoperability

A quick overview of the set of tools Inato used to migrate its codebase to Effect.

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->
---

<<< @/snippets/fpts.ts ts {all|5-9|11-26|28-40|42-55|57-66}{maxHeight:'80%'} twoslash
---

<<< @/snippets/step1.ts ts {22-25|27-31|43-45|47-53|60|67-69}{maxHeight:'80%'} twoslash
---

<<< @/snippets/step2.ts ts {63-69|71-74|58-61}{maxHeight:'80%'} twoslash
---

<<< @/snippets/step3.ts ts {13-16|24-28|32-34|44-48|53-56}{maxHeight:'80%'} twoslash
---

<<< @/snippets/step4.ts ts {30|50|71-75|77-84|70-85}{maxHeight:'80%'} twoslash

