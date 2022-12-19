#!/usr/bin/env node
import * as fc from "fast-check";
import { Arbitrary } from "fast-check";
import { quadrantArb } from "./Quadrant";
import { renderQuadrant } from "./render";

import * as yargs from "yargs";

const argv = yargs
  .option("count", {
    alias: "c",
    description: "The number of snowflakes to generate",
    type: "number",
    default: 1,
  })
  .option("seed", {
    alias: "s",
    description: "Manually supply a seed number",
    type: "number",
  })
  .help()
  .alias("help", "h").argv;

const seed = "seed" in argv ? argv.seed : Date.now();
const numRuns = "count" in argv ? argv.count : 1;

const quadrants = fc.sample(quadrantArb, {
  seed,
  numRuns,
});

console.log("");
quadrants.map(renderQuadrant).forEach((q) => {
  console.log(q);
  console.log("");
});
