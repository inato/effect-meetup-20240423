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

- Introduced fp-ts in our codebase in 2020
- ReaderTaskEither -> pretty similar to Effect:

```
ReaderTaskEither<R, E, A>
= Reader<R, TaskEither<E, A>>
= (context: R) => () => Promise<Either<E, A>>

<=> Effect<A, E, R>

Conceptually, you can think of Effect<Success, Error, Requirements> as an effectful version of the following function type:

~ type Effect<Success, Error, Requirements> = (
  context: Context<Requirements>
) => Error | Success
```

Effect is the description of a program, which is interpreted by the Effect runtime

<!-- Whereas RTE is already the program, you can only invoke it, 
whereas with Effect you can do sthg else. -->


- Decided officially to switch to Effect in 2024
  - Maintenance will end
  - Lack of documentation... (put screenshot of DR)
  https://www.notion.so/inato/Simpler-functional-programming-using-Effect-9051e313563f496abc06b4c235016f91
  - Go have a look to the detailed comparison of fp-ts and Effect on the Effect website [here](https://effect.website/docs/other/fp-ts#comparison-table)
---

# Context

- Around 400 use cases and 80ish ports and their adapters to migrate
- We needed a plan to ensure a smooth transition
- Objective: in 2,5 months, any new use case, port/adapters will be written using Effect

---

# The plan

1. Ensure our ports return ReaderTaskEither
2. Create Effect proxies of our ports
3. Start (re)writing use cases in Effect
4. Use a helper to generate an fp-ts version of any Effect use case to be able to run it
5. Start (re)writing ports in Effect
6. Use a helper to generate an fp-ts proxy of an Effect port
7. (Effect way) Run the Effect use cases like they're supposed to but still be able to run fp-ts use cases

---


# Example application

<<< @/snippets/fpts.ts ts {all|5-9|11-26|28-40|42-55|57-66}{maxHeight:'80%'} twoslash

---

# Create an Effect proxy using portToEffect

<<< @/snippets/step1.ts ts {22-25|27-31|43-45|47-53|60|65-67}{maxHeight:'80%'} twoslash

---

# Rewrite a usecase in Effect
Use effectToFpts to translate the usecase back to fp-ts (backward compatibility)

<<< @/snippets/step2.ts ts {63-67|69-72|58-61}{maxHeight:'80%'} twoslash

---

# Convert ports to Effect
Use portToFpts to create an fp-ts proxy of a port (backward compatibility)

<<< @/snippets/step3.ts ts {13-16|24-28|32-34|44-48|53-56}{maxHeight:'80%'} twoslash

---

# Run the Effect usecase like it's supposed to
Use contextToFpts to extract services and use them like before

<<< @/snippets/step4.ts ts {30|50|71-75|77-84|70-85}{maxHeight:'80%'} twoslash

---

# Some more helpers

Other utils like utils.optionFromFpts, utils.optionTraverseEffect...
(more generally, any helper to facilitate a smooth transition for the whole team)

```
import { Either, Option } from 'effect';
import { either, option } from 'fp-ts';

export const optionFromFpts: <A>(ma: option.Option<A>) => Option.Option<A> =
  option.matchW(Option.none, Option.some);
  
export const eitherFromFpts: <A, E>(
  e: either.Either<E, A>,
) => Either.Either<A, E> = either.matchW(Either.left, Either.right);
```

We were missing `option.traverse(rte.Applicative)(() => RTE)`, so we created ours:
```
import { Effect, Option } from 'effect';
import { dual } from 'effect/Function';

export const optionTraverseEffect = dual<
  <A, E, B, R>(
    f: (x: A) => Effect.Effect<B, E, R>,
  ) => (x: Option.Option<A>) => Effect.Effect<Option.Option<B>, E, R>,
  <A, E, B, R>(
    x: Option.Option<A>,
    f: (x: A) => Effect.Effect<B, E, R>,
  ) => Effect.Effect<Option.Option<B>, E, R>
>(2, (x, f) =>
  Option.isSome(x)
    ? Effect.map(f(x.value), Option.some)
    : Effect.succeed(Option.none()),
);
```

---

# Conclusion

- All ports migrated in around a month thanks to team work
- All runners migrated too so we could start writing Effect-only code without worrying about an fp-ts compatible version
- Today we alrady have 80ish new full Effect use cases

---

# Bonus (if we have time)
+ some examples on how having migrated to Effect feels so much better (if we have time)
	 -> (firstSuccessOf...)