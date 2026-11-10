# Random Quote Generator

A responsive quote website built with Node.js, Express, HTML, CSS, and vanilla JavaScript. The quote collection is stored in the server code; no database or third-party quote API is used.

## Run locally

1. Install Node.js 18 or newer.
2. Open this project folder in VS Code.
3. In the integrated terminal, install dependencies and start the server:

```bash
npm install
npm start
```

4. Visit [http://localhost:3000](http://localhost:3000).

For automatic server restarts during development, use `npm run dev`. Run the endpoint tests with `npm test`.

## API

- `GET /api/quotes` returns the complete array of quote objects.
- `GET /api/quote/random` returns one random quote and avoids returning the same quote twice in a row.

The frontend loads the collection and initial quote with `fetch()`. Copy uses the Clipboard API; Share uses the Web Share API where available and falls back to copying the quote when possible.