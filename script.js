const apiUrl = 'https://type.fit/api/quotes';
let apiQuotes = [];
// DOM elements
const quoteContainer = document.getElementById('quote-container');
const quoteTextElem = document.getElementById('quote');
const authorNameElem = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-btn');
const newQuoteBtn = document.getElementById('new-quote');
const loaderElem = document.getElementById('loader');

// Functions

const loading = () => {
  loaderElem.hidden = false;
  quoteContainer.hidden = true;
};

const loadingComplete = () => {
  loaderElem.hidden = true;
  quoteContainer.hidden = false;
};

const newQuote = () => {
  loading();
  const randomNumber = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomNumber];

  if (!quote.author) {
    authorNameElem.textContent = 'Unknown';
  } else {
    authorNameElem.textContent = quote.author;
  }

  // Changes style based on the quote lenght
  if (quote.text.length > 80) {
    quoteTextElem.classList.add('long-quote');
  } else {
    quoteTextElem.classList.remove('long-quote');
  }
  quoteTextElem.textContent = quote.text;

  loadingComplete();
};
const getQuotes = async () => {
  loading();
  try {
    // Value will be asigned only when the fetch ends
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
};

const tweetQuote = () => {
  // %0a is for line break
  const tweetText = `"${quoteTextElem.textContent}"%0a-${authorNameElem.textContent}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(twitterUrl, '_blank');
};

// Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
