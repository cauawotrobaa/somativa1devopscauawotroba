import test from 'node:test';
import assert from 'node:assert/strict';
import { createResponseBody, escapeHtml, projectFacts, renderHomePage } from '../src/app.js';

test('home page returns html', () => {
  const response = createResponseBody('/');

  assert.equal(response.statusCode, 200);
  assert.match(response.contentType, /text\/html/);
  assert.match(response.body, /Atlas DevOps/);
  assert.match(response.body, /npm test/);
});

test('health endpoint returns json', () => {
  const response = createResponseBody('/health');

  assert.equal(response.statusCode, 200);
  assert.match(response.contentType, /application\/json/);

  const payload = JSON.parse(response.body);
  assert.equal(payload.ok, true);
  assert.equal(payload.service, 'atlas-devops');
});

test('facts endpoint exposes project notes', () => {
  const response = createResponseBody('/api/facts');
  const payload = JSON.parse(response.body);

  assert.equal(payload.project, 'Atlas DevOps');
  assert.equal(payload.facts.length, projectFacts.length);
  assert.equal(payload.facts[0].title, 'CI confiavel');
});

test('unknown routes return not found', () => {
  const response = createResponseBody('/rota-desconhecida');

  assert.equal(response.statusCode, 404);
  assert.match(response.body, /nao encontrada/i);
});

test('escapeHtml converts special characters', () => {
  const value = escapeHtml('<atlas & devops> "test"');

  assert.equal(value, '&lt;atlas &amp; devops&gt; &quot;test&quot;');
});

test('renderHomePage includes one card per fact', () => {
  const html = renderHomePage();

  assert.equal((html.match(/<article class="card">/g) ?? []).length, projectFacts.length);
});