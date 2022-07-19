export type INullable<T> = T | null | undefined;
export const isString = (val: unknown): val is string =>
  typeof val === "string";
