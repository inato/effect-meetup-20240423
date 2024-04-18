import { Context, Effect } from "effect";
import * as rte from "fp-ts/ReaderTaskEither";
import type { ReaderTaskEither as RTE } from "fp-ts/ReaderTaskEither";
import { pipe } from "fp-ts/function";

// domain
class Foo {
  constructor(readonly id: string) {}
  static make = () => new Foo("random-id");
}

// ports & adpaters
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
export const createFooUseCase: RTE<FooRepositoryAccess, Error, Foo> = pipe(
  rte.of(Foo.make()),
  rte.tap(FooRepositoryFpts.store)
);

export const transformFooUseCase: (
  id: string
) => RTE<FooRepositoryAccess & TransformFooServiceAccess, Error, void> = (id) =>
  pipe(
    FooRepositoryFpts.getById(id),
    rte.flatMap(TransformFooServiceFpts.transform),
    rte.flatMap(FooRepositoryFpts.store)
  );

// program
const main = async () => {
  const fooRepository = await makeFooRepository();
  const transformFooService = await makeTransformFooService();
  await transformFooUseCase("my-foo-id")({
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
