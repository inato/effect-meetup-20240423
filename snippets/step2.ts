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
  getById: (id: string) => RTE<unknown, Error, Foo>;
  store: (foo: Foo) => RTE<unknown, Error, void>;
}

interface FooRepositoryAccess {
  fooRepository: FooRepository;
}

declare const FooRepositoryFpts: {
  getById: (id: string) => RTE<FooRepositoryAccess, Error, Foo>;
  store: (foo: Foo) => RTE<FooRepositoryAccess, Error, void>;
};

const FooRepositoryTag = Context.GenericTag<FooRepository>("FooRepository");

const FooRepository = portToEffect(FooRepositoryFpts, {
  fooRepository: FooRepositoryTag,
});

declare const makeFooRepository: () => Promise<FooRepository>;

interface TransformFooService {
  transform: (foo: Foo) => RTE<unknown, Error, Foo>;
}

interface TransformFooServiceAccess {
  transformFooService: TransformFooService;
}

declare const TransformFooServiceFpts: {
  transform: (foo: Foo) => RTE<TransformFooServiceAccess, Error, Foo>;
};

const TransformFooServiceTag = Context.GenericTag<TransformFooService>(
  "TransformFooService"
);

const TransformFooService = portToEffect(TransformFooServiceFpts, {
  transformFooService: TransformFooServiceTag,
});

declare const makeTransformFooService: () => Promise<TransformFooService>;

// usecases
export const createFooUseCase = pipe(
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
