export type INullable<T> = T | null | undefined;
export const isString = (val: unknown): val is string =>
  typeof val === "string";

export interface IPayloads {
  op: number;
  d?: Record<string, unknown>;
  s?: number;
  t?: string;
}

export const isArray = (val: unknown): val is unknown[] =>
  val instanceof Array && Array.isArray(val);
