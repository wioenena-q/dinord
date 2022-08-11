export interface ToJSON {
  toJSON(): Record<string, unknown>;
}

export interface ToObject {
  toObject(): Record<PropertyKey, unknown>;
}

export interface ToString {
  toString(): string;
}

export interface Equal<T> {
  eq(other: T): boolean;
}

export interface Patchable {
  patch(data: unknown): void;
}

export interface Clonable {
  clone(): this;
}

export interface Updatable {
  update(data: unknown): this;
}
