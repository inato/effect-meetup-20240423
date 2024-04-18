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

```ts {all}{maxHeight:'80%'} twoslash
import * as rte from 'fp-ts/ReaderTaskEither';
import type { ReaderTaskEither as RTE } from 'fp-ts/ReaderTaskEither';
import { pipe } from 'fp-ts/function';

// domain
class Foo {
  constructor(readonly id: string) {}
  static make = () => new Foo('random-id');
}

// ports & adpaters
interface FooRepository {
  getById: (id: string) => RTE<unknown, Error, Foo>;
  store: (foo: Foo) => RTE<unknown, Error, void>;
}

interface FooRepositoryAccess {
  fooRepository: FooRepository;
}

declare const FooRepository: {
  getById: (id: string) => RTE<FooRepositoryAccess, Error, Foo>;
  store: (foo: Foo) => RTE<FooRepositoryAccess, Error, void>;
};

declare const makeFooRepository: () => Promise<FooRepository>;

interface TransformFooService {
  transform: (foo: Foo) => RTE<unknown, Error, Foo>;
}

interface TransformFooServiceAccess {
  transformFooService: TransformFooService;
}

declare const TransformFooService: {
  transform: (foo: Foo) => RTE<TransformFooServiceAccess, Error, Foo>;
};

declare const makeTransformFooService: () => Promise<TransformFooService>;

// usecases
export const createFooUseCase: RTE<FooRepositoryAccess, Error, Foo> = pipe(
  rte.of(Foo.make()),
  rte.tap(FooRepository.store),
);

export const transformFooUseCase: (
  id: string,
) => RTE<FooRepositoryAccess & TransformFooServiceAccess, Error, void> = id =>
  pipe(
    FooRepository.getById(id),
    rte.flatMap(TransformFooService.transform),
    rte.flatMap(FooRepository.store),
  );

// program
const main = async () => {
  const fooRepository = await makeFooRepository();
  const transformFooService = await makeTransformFooService();
  await transformFooUseCase('my-foo-id')({
    transformFooService,
    fooRepository,
  })();
};
main();

```
