import { Context, Effect, Layer, ManagedRuntime } from "effect";
import * as rte from "fp-ts/ReaderTaskEither";
import type { ReaderTaskEither as RTE } from "fp-ts/ReaderTaskEither";
import { pipe } from "fp-ts/function";

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

declare const contextToFpts: <C, M>(
  ctx: C,
  mapping: M
) => {
  [k in keyof M]: Context.Tag.Identifier<
    // @ts-expect-error "M[k] is not a Tag.."
    M[k]
  >;
};

const ServiceId = Symbol();
type ServiceId = typeof ServiceId;

interface FptsConvertible<K extends string> {
  [ServiceId]?: K;
}

interface AnyFptsConvertible extends FptsConvertible<any> {}

type FptsIdOf<X extends AnyFptsConvertible> = NonNullable<X[ServiceId]>;

type FptsAccess<X extends AnyFptsConvertible> = {
  [k in FptsIdOf<X>]: X;
};

const getFptsMapping = <I, S extends AnyFptsConvertible>(
  tag: Context.Tag<I, S>,
  name: FptsIdOf<Context.Tag.Service<typeof tag>>
): { [x in FptsIdOf<Context.Tag.Service<typeof tag>>]: typeof tag } => ({
  [name]: tag,
});

// domain
class Foo {
  constructor(readonly id: string) {}
  static make = () => new Foo("random-id");
}

// ports & adpaters
interface FooRepository extends FptsConvertible<"fooRepository"> {
  getById: (id: string) => Effect.Effect<Foo, Error>;
  store: (foo: Foo) => Effect.Effect<void, Error>;
}

interface FooRepositoryAccess extends FptsAccess<FooRepository> {}

const FooRepositoryTag = Context.GenericTag<FooRepository>("FooRepository");

const FooRepositoryFptsMapping = getFptsMapping(
  FooRepositoryTag,
  "fooRepository"
);

const FooRepository = Effect.serviceFunctions(FooRepositoryTag);

const FooRepositoryFpts = portToFpts(FooRepository, FooRepositoryFptsMapping);

declare const FooRepositoryLive: Layer.Layer<FooRepository>;

interface TransformFooService extends FptsConvertible<"transformFooService"> {
  transform: (foo: Foo) => Effect.Effect<Foo, Error>;
}

interface TransformFooServiceAccess extends FptsAccess<TransformFooService> {}

const TransformFooServiceTag = Context.GenericTag<TransformFooService>(
  "TransformFooService"
);

const TransformFooServiceFptsMapping = getFptsMapping(
  TransformFooServiceTag,
  "transformFooService"
);

const TransformFooService = Effect.serviceFunctions(TransformFooServiceTag);

const TransformFooServiceFpts = portToFpts(
  TransformFooService,
  TransformFooServiceFptsMapping
);

declare const TransformFooServiceLive: Layer.Layer<TransformFooService>;

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
  ...TransformFooServiceFptsMapping,
  ...FooRepositoryFptsMapping,
});

// program
const main = async () => {
  const runtime = ManagedRuntime.make(
    Layer.mergeAll(FooRepositoryLive, TransformFooServiceLive)
  );

  await runtime.runPromise(transformFooUseCase("my-foo-id"));

  const { context } = await runtime.runtime();

  const services = contextToFpts(context, {
    ...TransformFooServiceFptsMapping,
    ...FooRepositoryFptsMapping,
  });

  await createFooUseCase(services)();
};
main();
