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