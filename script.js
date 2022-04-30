const apiUrl = 'https://type.fit/api/quotes';
let apiQuotes = [];

const newQuote = () => {
  const randomNumber = Math.floor(Math.random() * apiQuotes.length);
};
const getQuotes = async () => {
  try {
    // Value will be asigned only when the fetch ends
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
};

getQuotes();
