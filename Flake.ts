import * as fc from "fast-check";
import { Char, char } from "./Char";

export type Flake = {
  initial: Char;
  reverse: Char;
  reverseFlipped: Char;
  flipped: Char;
};

export const flake = (
  initial: Char,
  reverse: Char,
  reverseFlipped: Char,
  flipped: Char
): Flake => ({
  initial,
  reverse,
  reverseFlipped,
  flipped,
});

export const monoflake = (char: Char): Flake => ({
  initial: char,
  reverse: char,
  reverseFlipped: char,
  flipped: char,
});

export const biflake = (initial: Char, reverse: Char): Flake => ({
  initial,
  reverse,
  reverseFlipped: reverse,
  flipped: initial,
});

// \/
// /\
// X
// I
// '.
// <>
// «»

export const flakes = [
  biflake(char("«"), char("»")),

  biflake(char("["), char("]")),

  biflake(char("{"), char("}")),
  flake(char("\\"), char("/"), char("\\"), char("/")),
  flake(char("/"), char("\\"), char("/"), char("\\")),
  flake(char("."), char("."), char("'"), char("'")),
  flake(char("M"), char("M"), char("W"), char("W")),
  flake(char("ꓕ"), char("ꓕ"), char("T"), char("T")),
  flake(char("A"), char("A"), char("∀"), char("∀")),
  flake(char("∩"), char("∩"), char("∪"), char("∪")),

  biflake(char("<"), char(">")),
  monoflake(char("*")),
  monoflake(char("X")),
  monoflake(char("I")),
  monoflake(char("-")),
  monoflake(char("~")),
  monoflake(char("|")),
];

export const flakeArb = fc.constantFrom(...flakes);
