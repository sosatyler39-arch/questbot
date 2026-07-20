import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSteps } from '../src/checklist.js';
import { buildServer } from '../src/index.js';

test('parseSteps strips list markers and blank lines', () => {
  assert.deepEqual(parseSteps('1. Go north\n2) Beat the boss\n- Loot the chest\n\n• Return'), [
    'Go north',
    'Beat the boss',
    'Loot the chest',
    'Return',
  ]);
});

test('parseSteps handles clean one-per-line output unchanged', () => {
  assert.deepEqual(parseSteps('Talk to Ranni\nFind Blaidd'), ['Talk to Ranni', 'Find Blaidd']);
});

test('POST /checklist without an answer is a 400', async (t) => {
  const app = await buildServer();
  t.after(() => app.close());
  const res = await app.inject({ method: 'POST', url: '/checklist', payload: {} });
  assert.equal(res.statusCode, 400);
});

test('POST /checklist returns titled steps', { skip: !process.env.GEMINI_API_KEY }, async (t) => {
  const app = await buildServer();
  t.after(() => app.close());
  const res = await app.inject({
    method: 'POST',
    url: '/checklist',
    payload: {
      question: "How do I complete Ranni's questline?",
      answer:
        'First speak to Ranni at Ranni\'s Rise, then find Blaidd in Siofra River. ' +
        'Once you have the Fingerslayer Blade from Nokron, return it to Ranni.',
    },
  });
  assert.equal(res.statusCode, 200);
  const body = res.json();
  assert.equal(body.title, "How do I complete Ranni's questline?");
  assert.ok(Array.isArray(body.steps) && body.steps.length >= 3, `got ${body.steps?.length} steps`);
});
