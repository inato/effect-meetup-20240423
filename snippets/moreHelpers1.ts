import { Either, Option } from 'effect';
import { either, option } from 'fp-ts';

export const optionFromFpts: <A>(ma: option.Option<A>) => Option.Option<A> =
  option.matchW(Option.none, Option.some);
  
export const eitherFromFpts: <A, E>(
  e: either.Either<E, A>,
) => Either.Either<A, E> = either.matchW(Either.left, Either.right);