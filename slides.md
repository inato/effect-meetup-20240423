---
theme: default
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

# Introduction

- Inato is a global clinical trials marketplace disrupting traditional feasibility

<v-clicks>

- Introduced fp-ts in our codebase in 2020

</v-clicks>

<v-clicks>

```ts
ReaderTaskEither<R, E, A>
= Reader<R, TaskEither<E, A>>
= (context: R) => () => Promise<Either<E, A>>

<=> Effect<A, E, R>

~ type Effect<Success, Error, Requirements> = (
  context: Context<Requirements>
) => Error | Success
```

</v-clicks>

<!-- 
Helping sites get access to the right trials for them and their patients, Inato finds sites with untapped patient populations, high motivation, strong capabilities, and low competition

Before using fp-ts we had our own Either implementation but we had nothing for Option for instance 

Introduced fp-ts to embrace functional patterns

Effect is the description of a program, which is interpreted by the Effect runtime

Whereas RTE is already the program, you can only invoke it, whereas with Effect you can do sthg else. 
-->

---
layout: two-cols
layoutClass: gap-16
---

# The switch


- Decided officially to switch from fp-ts to Effect in 2024

  <v-clicks depth="2" >

  - Active development will end
  - Steep learning curve
  - Lack of documentation 
  - Many other points: [fp-ts vs Effect](https://effect.website/docs/other/fp-ts#comparison-table)

  </v-clicks>

::right::

<v-after>

<img src="/fptsEffectComparison.png" class="h-120 rounded shadow" />

</v-after>

<!-- 
(put screenshot of DR?) https://www.notion.so/inato/Simpler-functional-programming-using-Effect-9051e313563f496abc06b4c235016f91
-->

---

# Context

<div class="grid grid-cols-[1fr_35%] gap-4">
<div>

<img src="/codebase.png" class="h-100%">

</div>
<div>

<v-clicks>

- Around 400 use cases and 80 ports and their adapters to migrate
- Plan needed to ensure a smooth transition

- 🎯 Objective: in 2,5 months, any new use case, port/adapters will be written using Effect

</v-clicks>

</div>
</div>

---

# The plan


1. Ensure our ports return ReaderTaskEither

<v-clicks >

2. Create Effect proxies of our ports
1. Start (re)writing use cases in Effect
1. Use a helper to generate an fp-ts version of any Effect use case to be able to run it
1. Start (re)writing ports in Effect
1. Use a helper to generate an fp-ts proxy of an Effect port
1. Be able to run Effect and fp-ts use cases

</v-clicks>

<!-- 
1-To be able to easily switch to Effect 

4-Because our runners are not able to run Effect use cases yet at that point

6-At that point, the objective is completed: we can write everything in Effect, and still generate fp-ts facades. But that's not satisfying right?
 -->

---


# Example application
Representative of our codebase

<<< @/snippets/fpts.ts ts {all|5-9|11-26|28-40|42-55|57-66}{maxHeight:'80%'} twoslash

---

# Create an Effect proxy
Use `portToEffect` to create an Effect proxy of an `fp-ts` port

<<< @/snippets/step1.ts ts {22-25|27-31|43-45|47-53|60|65-67}{maxHeight:'80%'} twoslash

---

# Rewrite a usecase in Effect
Use `effectToFpts` to translate the usecase back to `fp-ts` for backward compatibility

<<< @/snippets/step2.ts ts {63-67|69-72|58-61}{maxHeight:'80%'} twoslash

---

# Convert ports to Effect
Use `portToFpts` to create an `fp-ts` proxy of an Effect port for backward compatibility

<<< @/snippets/step3.ts ts {13-16|24-28|32-34|44-48|53-56}{maxHeight:'80%'} twoslash

---

# Run the usecase the Effect way
Use `contextToFpts` to extract ports for backward compatibility

<<< @/snippets/step4.ts ts {30|50|71-75|77-84|70-85}{maxHeight:'80%'} twoslash

---

# Define fp-ts mappings
`FptsConvertibel<T>` and `getFptsMapping` makes it easier to use other helpers

<<< @/snippets/step5.ts ts {102-105|107|111-114|118|122-135|139-142|158-161|173-176}{maxHeight:'80%'} twoslash

---

# Helpers recap

`contextToFpts`: extract ports from Effect context

<<< @/snippets/helpersRecap.ts#contextToFpts ts {maxHeight:'80%'}

---

# Helpers recap

`portToEffect`: creates an Effect proxy of an `fp-ts` port

<<< @/snippets/helpersRecap.ts#portToEffect ts {maxHeight:'80%'}

---

# Helpers recap

`effectToFpts`: translates an Effect usecase to `fp-ts`

<<< @/snippets/helpersRecap.ts#effectToFpts ts {maxHeight:'80%'}

---

# Helpers recap

`portToFpts`: creates an `fp-ts` proxy of an Effect port

<<< @/snippets/helpersRecap.ts#portToFpts ts {maxHeight:'80%'}

---

# Some more helpers

To facilitate a smooth transition for the whole team, we added some more helpers:

<<< @/snippets/moreHelpers1.ts ts {maxHeight:'80%'} twoslash

---

# Some more helpers

We were missing the fp-ts `option.traverse`, so we created ours:

<<< @/snippets/moreHelpers2.ts ts {maxHeight:'80%'} twoslash

---

# Conclusion

- Objective accomplished in 2 months! 

<v-clicks>

- All ports migrated in around a month thanks to team work
- All runners migrated
- Today: around 80 new full Effect use cases
- We even got rid of fp-ts options in our domain

</v-clicks>

<!-- 
Runners migrated => so we could start writing Effect-only code without worrying about an fp-ts compatible version
 -->

---

# Thank you!

Any questions?

<!-- 

# Bonus (if we have time)
+ firstSuccessOf
+ RateLimiting -->
