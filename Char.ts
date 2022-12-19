export type Char = string & { length: 1 };

export type FirstChar<T> = T extends `${infer U}${string}` ? U : never;

export type IsChar<T> = T extends `${infer U}${infer Rest}`
  ? Rest extends ""
    ? Char
    : never
  : never;

export const char = <C extends string>(char: C): IsChar<C> => {
  if (char.length === 1) {
    return char as IsChar<C>;
  } else {
    throw new Error("char constructor called with not a char");
  }
};
