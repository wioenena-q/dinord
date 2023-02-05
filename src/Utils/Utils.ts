export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export type Nullable<T> = T | null;
