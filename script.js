const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];

// Show Loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading 
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote(){
// We put the Loading function at the top and the Complete function at the bottom.
    loading();
// Pick a random quote from apiQuotes array

const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// Check if Author field is blank and replace it with 'Unknown'
if (!quote.author){
    authorText.textContent = 'Unknown';
} else {
    authorText.textContent = quote.author;
}
// Check Quote length to determine styling
if (quote.text.length > 120){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}

// Set Quote, Hide Loader
quoteText.textContent = quote.text;
complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank' )
    // '_blank' It allows Twitter to open in a new tap.
}
// To get the Twitter button to work we need to add some (eventListners).
//Event Listners
newQuoteBtn.addEventListener('click', newQuote);
// we use 'click' event to run newQuote function.

// we do the same thing for Twitter button.
twitterBtn.addEventListener('click', tweetQuote);



//On Load
getQuotes();
