import { Context, Effect } from "effect";
import * as rte from "fp-ts/ReaderTaskEither";
import type { ReaderTaskEither as RTE } from "fp-ts/ReaderTaskEither";
import { pipe } from "fp-ts/function";

// domain
class Foo {
  constructor(readonly id: string) {}
  static make = () => new Foo("random-id");
}

// ports & adapters
interface FooRepository {
  getById: (id: string) => Effect.Effect<Foo, Error>;
  store: (foo: Foo) => Effect.Effect<void, Error>;
}

interface FooRepositoryAccess {
  fooRepository: FooRepository;
}

const FooRepositoryTag = Context.GenericTag<FooRepository>("FooRepository");

const FooRepository = Effect.serviceFunctions(FooRepositoryTag);

const FooRepositoryFpts = portToFpts(FooRepository, {
  fooRepository: FooRepositoryTag,
});

declare const makeFooRepository: () => Promise<FooRepository>;

interface TransformFooService {
  transform: (foo: Foo) => Effect.Effect<Foo, Error>;
}

interface TransformFooServiceAccess {
  transformFooService: TransformFooService;
}

const TransformFooServiceTag = Context.GenericTag<TransformFooService>(
  "TransformFooService"
);

const TransformFooService = Effect.serviceFunctions(TransformFooServiceTag);

const TransformFooServiceFpts = portToFpts(TransformFooService, {
  fooRepository: FooRepositoryTag,
});

declare const makeTransformFooService: () => Promise<TransformFooService>;

// usecases
export const createFooUseCase: RTE<FooRepositoryAccess, Error, Foo> = pipe(
  rte.of(Foo.make()),
  rte.tap(FooRepositoryFpts.store)
);

export const transformFooUseCase = (id: string) =>
  FooRepository.getById(id).pipe(
    Effect.flatMap(TransformFooService.transform),
    Effect.flatMap(FooRepository.store)
  );

export const transformFooUseCaseFpts = effectToFpts(transformFooUseCase, {
  fooRepository: FooRepositoryTag,
  transformFooService: TransformFooServiceTag,
});

// program
const main = async () => {
  const fooRepository = await makeFooRepository();
  const transformFooService = await makeTransformFooService();
  await transformFooUseCaseFpts("my-foo-id")({
    transformFooService,
    fooRepository,
  })();
};
main();

// utils
declare const portToEffect: <P, M>(
  port: P,
  mapping: M
) => {
  [k in keyof P]: P[k] extends (
    ...args: infer Args
  ) => RTE<infer Env, infer Err, infer A>
    ? (...args: Args) => Effect.Effect<
        A,
        Err,
        Context.Tag.Identifier<
          // @ts-expect-error "M[keyof Env] is not a Tag.."
          M[keyof Env]
        >
      >
    : never;
};

declare const effectToFpts: <F, M>(
  fun: F,
  mapping: M
) => F extends (
  ...args: infer Args
) => Effect.Effect<infer A, infer E, infer Env>
  ? (...args: Args) => RTE<
      {
        [k in keyof M]: Context.Tag.Identifier<
          // @ts-expect-error "M[k] is not a Tag.."
          M[k]
        >;
      },
      E,
      A
    >
  : never;

declare const portToFpts: <P, M>(
  port: P,
  mapping: M
) => {
  [k in keyof P]: P[k] extends (
    ...args: infer Args
  ) => Effect.Effect<infer A, infer E, infer Env>
    ? (...args: Args) => RTE<
        {
          [k in keyof M]: Context.Tag.Identifier<
            // @ts-expect-error "M[k] is not a Tag.."
            M[k]
          >;
        },
        E,
        A
      >
    : never;
};
