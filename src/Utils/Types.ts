export interface ToJSON {
  toJSON(): Record<string, unknown>;
}

export interface ToObject {
  toObject(): Record<string, unknown>;
}

export interface ToString {
  toString(): string;
}

export interface Eq<T> {
  eq(other: T): boolean;
}
