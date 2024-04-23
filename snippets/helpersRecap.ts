// #region contextToFpts
const contextToFpts = (ctx, mapping) =>
  Record.mapEntries(mapping, (_, tag) => Context.get(ctx, tag));
// #endregion contextToFpts

// #region portToEffect
const portToEffect = (port, mapping) =>
  new Proxy(
    {},
    {
      get(_target, property) {
        return (...args) =>
          pipe(
            Effect.context(),
            Effect.map((ctx) => {
              const fptsEnv = contextToFpts(ctx, mapping);
              return port[property](...args)(fptsEnv)();
            })
            Effect.flatMap(Effect.promise),
            Effect.flatMap(eitherFromFpts),
          );
      },
    }
  );
// #endregion portToEffect

// #region effectToFpts
const effectToFpts =
  (fun, mapping) =>
  (...args) =>
  (access) => {
    const effect = fun(...args);
    let ctx = Context.empty();
    for (const m in mapping) {
      ctx = Context.add(mapping[m], access[m])(ctx);
    }
    return () =>
      pipe(
        effect, 
        Effect.provide(ctx), 
        Effect.either, 
        Effect.runPromise
      );
  };
// #endregion effectToFpts

// #region portToFpts
const portToFpts = (port, mapping) =>
  new Proxy(
    {},
    {
      get(_target, property) {
        return effectToFpts(port[property], mapping);
      },
    }
  );
// #endregion portToFpts
