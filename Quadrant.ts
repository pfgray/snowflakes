import * as fc from "fast-check";
import { Flake, flakeArb } from "./Flake";

export type GeneralQuadrant<T> = {
  top: [T, T];
  middle: [T, T, T, T, T, T];
  bottom: [T, T, T, T];
};

const map =
  <A, B>(ab: (a: A) => B) =>
  (q: GeneralQuadrant<A>): GeneralQuadrant<B> => {
    return {
      top: q.top.map(ab),
      middle: q.middle.map(ab),
      bottom: q.bottom.map(ab),
    } as GeneralQuadrant<B>;
  };

export type Quadrant = GeneralQuadrant<Flake>;

export const quadrantArb = fc.record({
  top: fc.tuple(flakeArb, flakeArb),
  middle: fc.tuple(flakeArb, flakeArb, flakeArb, flakeArb, flakeArb, flakeArb),
  bottom: fc.tuple(flakeArb, flakeArb, flakeArb, flakeArb),
});

export const initials = map((f: Flake) => f.initial);
export const reversed = map((f: Flake) => f.reverse);
export const reversedFlipped = map((f: Flake) => f.reverseFlipped);
export const flipped = map((f: Flake) => f.flipped);
