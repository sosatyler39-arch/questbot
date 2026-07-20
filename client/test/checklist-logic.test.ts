import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isMultiStepAnswer,
  makeChecklist,
  toggleStep,
  upsertChecklist,
  removeChecklist,
} from '../src/renderer/checklist-logic.js';

test('isMultiStepAnswer: numbered lists read as multi-step', () => {
  assert.equal(isMultiStepAnswer('1. Go to Stormveil.\n2. Beat Margit.\n3. Talk to Gostoc.'), true);
});

test('isMultiStepAnswer: sequential connectives read as multi-step', () => {
  assert.equal(
    isMultiStepAnswer('First speak to Ranni at her tower, then find Blaidd in Siofra. Once you have the Fingerslayer Blade, return to her.'),
    true,
  );
});

test('isMultiStepAnswer: a plain single-fact answer does not', () => {
  assert.equal(isMultiStepAnswer('Margit is weak to jump attacks and bleed.'), false);
});

test('makeChecklist builds unchecked steps with an id', () => {
  const list = makeChecklist('Ranni questline', ['Talk to Ranni', 'Find Blaidd'], 'answer');
  assert.ok(list.id.length > 0);
  assert.equal(list.steps.length, 2);
  assert.deepEqual(list.steps.map((s) => s.done), [false, false]);
  assert.equal(list.source, 'answer');
});

test('toggleStep flips exactly one step and does not mutate the original', () => {
  const list = makeChecklist('t', ['a', 'b'], 'route');
  const toggled = toggleStep(list, 1);
  assert.deepEqual(toggled.steps.map((s) => s.done), [false, true]);
  assert.deepEqual(list.steps.map((s) => s.done), [false, false]);
  assert.deepEqual(toggleStep(toggled, 1).steps.map((s) => s.done), [false, false]);
});

test('upsertChecklist appends new and replaces existing by id', () => {
  const a = makeChecklist('a', ['x'], 'answer');
  const b = makeChecklist('b', ['y'], 'answer');
  const lists = upsertChecklist(upsertChecklist([], a), b);
  assert.equal(lists.length, 2);
  const updatedA = { ...a, title: 'a2' };
  const replaced = upsertChecklist(lists, updatedA);
  assert.equal(replaced.length, 2);
  assert.equal(replaced.find((l) => l.id === a.id)?.title, 'a2');
});

test('removeChecklist drops by id', () => {
  const a = makeChecklist('a', ['x'], 'answer');
  assert.deepEqual(removeChecklist([a], a.id), []);
  assert.equal(removeChecklist([a], 'nope').length, 1);
});
