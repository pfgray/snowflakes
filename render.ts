import { Char } from "./Char";
import { Flake } from "./Flake";
import {
  flipped,
  GeneralQuadrant,
  initials,
  Quadrant,
  reversed,
  reversedFlipped,
} from "./Quadrant";

const format = (dir: "start" | "end") => (s: string) =>
  dir === "end"
    ? s.split("").reverse().join("").padEnd(6, " ")
    : s.padStart(6, " ");

const genRowStrings =
  (f: (q: Quadrant) => GeneralQuadrant<Char>, dir: "start" | "end") =>
  (q: Quadrant) => {
    const { top, middle, bottom } = f(q);
    return {
      top: format(dir)(top.join("")),
      middle: format(dir)(middle.join("")),
      bottom: format(dir)(bottom.join("")),
    };
  };

export function renderQuadrant(q: Quadrant): string {
  const topLeft = genRowStrings(initials, "start")(q);
  const bottomLeft = genRowStrings(flipped, "start")(q);
  const topRight = genRowStrings(reversed, "end")(q);
  const bottomRight = genRowStrings(reversedFlipped, "end")(q);

  const rows = [
    topLeft.top + topRight.top,
    topLeft.middle + topRight.middle,
    topLeft.bottom + topRight.bottom,
    bottomLeft.bottom + bottomRight.bottom,
    bottomLeft.middle + bottomRight.middle,
    bottomLeft.top + bottomRight.top,
  ];
  return rows.join("\n");
}
