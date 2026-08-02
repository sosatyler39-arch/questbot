import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateCalcCorrectGraph, type CalcCorrectGraph } from './scaling-curve.js';

const REAL_GRAPH_0: CalcCorrectGraph = [
  { maxVal: 1, maxGrowVal: 0, adjPt: 1.2 },
  { maxVal: 18, maxGrowVal: 0.25, adjPt: -1.2 },
  { maxVal: 60, maxGrowVal: 0.75, adjPt: 1 },
  { maxVal: 80, maxGrowVal: 0.9, adjPt: 1 },
  { maxVal: 150, maxGrowVal: 1.1, adjPt: 1 },
];

test('evaluateCalcCorrectGraph hits each breakpoint exactly at its maxVal boundary', () => {
  const result = evaluateCalcCorrectGraph(REAL_GRAPH_0);
  assert.equal(result[1], 0);
  assert.equal(result[18], 0.25);
  assert.equal(result[80], 0.9);
});

test('evaluateCalcCorrectGraph produces an array long enough to index up to 148', () => {
  const result = evaluateCalcCorrectGraph(REAL_GRAPH_0);
  assert.equal(result.length, 149);
  // Index 148 is capped below the final breakpoint's own maxVal (150), so it
  // never actually reaches that breakpoint's maxGrowVal (1.1) exactly —
  // ratio = (148-80)/(150-80) = 68/70, short of 1.
  assert.equal(result[148], 0.9 + 0.2 * (68 / 70));
});
