const express = require('express');
const path = require('node:path');

const app = express();
const port = Number(process.env.PORT) || 3000;

// Original, public-domain-style reminders keep the project independent of external APIs.
const quotes = [
  { id: 1, text: 'Start where you are. A small beginning still changes the direction of your day.', author: 'Anonymous' },
  { id: 2, text: 'Progress is built from the promises you keep to yourself.', author: 'Anonymous' },
  { id: 3, text: 'You do not need the whole map to take the next good step.', author: 'Anonymous' },
  { id: 4, text: 'Let patience do its quiet work while courage does the walking.', author: 'Anonymous' },
  { id: 5, text: 'A difficult chapter is not the whole story.', author: 'Anonymous' },
  { id: 6, text: 'Make room for the person you are becoming.', author: 'Anonymous' },
  { id: 7, text: 'Consistency turns ordinary effort into remarkable change.', author: 'Anonymous' },
  { id: 8, text: 'Rest is part of the rhythm, not a reason to quit.', author: 'Anonymous' },
  { id: 9, text: 'The future is shaped by what you choose to practice today.', author: 'Anonymous' },
  { id: 10, text: 'Bravery can be quiet: sometimes it is simply beginning again.', author: 'Anonymous' },
  { id: 11, text: 'Give your attention to what helps you grow.', author: 'Anonymous' },
  { id: 12, text: 'One honest attempt is worth more than a perfect plan left untouched.', author: 'Anonymous' },
  { id: 13, text: 'You can move slowly and still be moving forward.', author: 'Anonymous' },
  { id: 14, text: 'Treat each setback as information, not a verdict.', author: 'Anonymous' },
  { id: 15, text: 'A little progress, repeated often, becomes a powerful thing.', author: 'Anonymous' },
  { id: 16, text: 'Your pace is allowed to be different from everyone else’s.', author: 'Anonymous' },
  { id: 17, text: 'Choose the next step that brings you closer to your values.', author: 'Anonymous' },
  { id: 18, text: 'Confidence grows each time you act before you feel fully ready.', author: 'Anonymous' },
  { id: 19, text: 'The effort you make in private still counts.', author: 'Anonymous' },
  { id: 20, text: 'Keep going; clarity often arrives after the first few steps.', author: 'Anonymous' },
  { id: 21, text: 'A kind word to yourself can be the start of a stronger day.', author: 'Anonymous' },
  { id: 22, text: 'Focus on what you can shape, then give it your best attention.', author: 'Anonymous' },
  { id: 23, text: 'Every skill you admire began as something unfamiliar.', author: 'Anonymous' },
  { id: 24, text: 'Let curiosity take you further than fear can hold you back.', author: 'Anonymous' },
  { id: 25, text: 'There is strength in asking for help and wisdom in accepting it.', author: 'Anonymous' },
  { id: 26, text: 'You are allowed to outgrow yesterday’s version of success.', author: 'Anonymous' },
  { id: 27, text: 'Small acts of discipline make more room for freedom.', author: 'Anonymous' },
  { id: 28, text: 'Do what you can with care; let that be enough for today.', author: 'Anonymous' },
  { id: 29, text: 'A fresh start can happen in the middle of an ordinary afternoon.', author: 'Anonymous' },
  { id: 30, text: 'The way forward is often made by showing up one more time.', author: 'Anonymous' },
  { id: 31, text: 'Let your goals be big and your next action be simple.', author: 'Anonymous' },
  { id: 32, text: 'Growth asks for effort, but it also makes space for joy.', author: 'Anonymous' },
  { id: 33, text: 'You have made it through days you once thought you could not.', author: 'Anonymous' },
  { id: 34, text: 'Protect the time you need to become who you want to be.', author: 'Anonymous' },
  { id: 35, text: 'A setback can redirect your path without diminishing your purpose.', author: 'Anonymous' },
  { id: 36, text: 'Begin with hope, continue with effort, and celebrate the distance.', author: 'Anonymous' }
];

let previousRandomId = null;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/quotes', (_request, response) => {
  response.json(quotes);
});

app.get('/api/quote/random', (_request, response) => {
  const availableQuotes = quotes.filter((quote) => quote.id !== previousRandomId);
  const quote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
  previousRandomId = quote.id;
  response.json(quote);
});

app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'API route not found.' });
});

app.use((_request, response) => {
  response.status(404).sendFile(path.join(__dirname, 'public', 'index.html'), (error) => {
    if (error) response.status(404).json({ error: 'Page not found.' });
  });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'An unexpected server error occurred.' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Random Quote Generator is running at http://localhost:${port}`);
  });
}

module.exports = { app, quotes };