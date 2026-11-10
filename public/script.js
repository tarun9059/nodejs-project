const quoteContent = document.querySelector('#quote-content');
const quoteText = document.querySelector('#quote-text');
const quoteAuthor = document.querySelector('#quote-author');
const quoteCount = document.querySelector('#quote-count');
const newQuoteButton = document.querySelector('#new-quote-button');
const copyButton = document.querySelector('#copy-button');
const shareButton = document.querySelector('#share-button');
const statusMessage = document.querySelector('#status-message');

let currentQuote = null;
let allQuotes = [];
let statusTimer;

function showStatus(message) {
  window.clearTimeout(statusTimer);
  statusMessage.textContent = message;
  statusMessage.classList.add('is-visible');
  statusTimer = window.setTimeout(() => statusMessage.classList.remove('is-visible'), 2400);
}

function setQuote(quote, total = allQuotes.length) {
  currentQuote = quote;
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = `—  ${quote.author}`;
  const position = allQuotes.findIndex((item) => item.id === quote.id) + 1;
  quoteCount.innerHTML = `${String(position || 1).padStart(2, '0')} <span>/ ${total}</span>`;
}

async function loadQuotes() {
  const response = await fetch('/api/quotes');
  if (!response.ok) throw new Error('Could not load the quote collection.');
  allQuotes = await response.json();
  if (!Array.isArray(allQuotes) || allQuotes.length === 0) {
    throw new Error('The quote collection is empty.');
  }
}

async function getRandomQuote() {
  const response = await fetch('/api/quote/random');
  if (!response.ok) throw new Error('Could not get a new quote.');
  const quote = await response.json();

  // Keep the display fresh even if the API is changed or customized later.
  if (currentQuote && allQuotes.length > 1 && quote.id === currentQuote.id) {
    const alternatives = allQuotes.filter((item) => item.id !== currentQuote.id);
    return alternatives[Math.floor(Math.random() * alternatives.length)];
  }
  return quote;
}

async function displayNewQuote() {
  newQuoteButton.disabled = true;
  quoteContent.classList.add('is-changing');
  try {
    const quote = await getRandomQuote();
    window.setTimeout(() => {
      setQuote(quote);
      quoteContent.classList.remove('is-changing');
      newQuoteButton.disabled = false;
    }, 180);
    showStatus('A fresh thought, just for you.');
  } catch (error) {
    quoteContent.classList.remove('is-changing');
    newQuoteButton.disabled = false;
    showStatus(error.message || 'Something went wrong. Please try again.');
  }
}

async function copyQuote() {
  if (!currentQuote) return;
  const text = `“${currentQuote.text}” — ${currentQuote.author}`;
  try {
    await navigator.clipboard.writeText(text);
    showStatus('Quote copied to clipboard.');
  } catch (_error) {
    showStatus('Clipboard access is unavailable in this browser.');
  }
}

async function shareQuote() {
  if (!currentQuote) return;
  const shareData = { title: 'A thought to keep', text: `“${currentQuote.text}” — ${currentQuote.author}` };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      if (error.name !== 'AbortError') showStatus('The quote could not be shared.');
    }
  } else {
    try {
      await navigator.clipboard.writeText(shareData.text);
      showStatus('Sharing is unavailable; quote copied instead.');
    } catch (_error) {
      showStatus('Sharing is not supported in this browser.');
    }
  }
}

newQuoteButton.addEventListener('click', displayNewQuote);
copyButton.addEventListener('click', copyQuote);
shareButton.addEventListener('click', shareQuote);

loadQuotes()
  .then(() => getRandomQuote())
  .then((quote) => setQuote(quote))
  .catch((error) => {
    quoteText.textContent = 'We could not load a quote right now. Please refresh to try again.';
    quoteAuthor.textContent = '—  Random Quote Generator';
    showStatus(error.message || 'Please check your connection and try again.');
    newQuoteButton.disabled = true;
  });