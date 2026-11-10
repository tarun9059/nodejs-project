const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { app, quotes } = require('../server');

test('GET /api/quotes returns the complete quote collection', async () => {
  const response = await request(app).get('/api/quotes').expect(200).expect('Content-Type', /json/);
  assert.equal(response.body.length, 36);
  assert.deepEqual(response.body[0], quotes[0]);
  assert.ok(response.body.every((quote) => quote.text && quote.author));
});

test('GET /api/quote/random returns a quote and avoids consecutive repeats', async () => {
  const first = await request(app).get('/api/quote/random').expect(200);
  const second = await request(app).get('/api/quote/random').expect(200);
  assert.ok(quotes.some((quote) => quote.id === first.body.id));
  assert.notEqual(first.body.id, second.body.id);
});

test('Unknown API routes return a JSON 404', async () => {
  const response = await request(app).get('/api/missing').expect(404).expect('Content-Type', /json/);
  assert.equal(response.body.error, 'API route not found.');
});

test('The homepage is served by Express', async () => {
  const response = await request(app).get('/').expect(200).expect('Content-Type', /html/);
  assert.match(response.text, /Random Quote Generator/);
});