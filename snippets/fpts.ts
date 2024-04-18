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
  rte.tap(FooRepository.store)
);

export const transformFooUseCase: (
  id: string
) => RTE<FooRepositoryAccess & TransformFooServiceAccess, Error, void> = (id) =>
  pipe(
    FooRepository.getById(id),
    rte.flatMap(TransformFooService.transform),
    rte.flatMap(FooRepository.store)
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
