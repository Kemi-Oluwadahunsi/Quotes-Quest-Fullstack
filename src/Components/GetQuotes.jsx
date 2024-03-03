import  { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import domtoimage from 'dom-to-image';

function GetQuotes({ setQuote }) {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const Quote = ({ text }) => (
    <div className="block lg:text-lg font-bold mb-2">
      {text}
    </div>
  );

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (quotes.length > 0) {
      setQuote(quotes[0]);
    }
  }, [quotes, setQuote]);
  

  const getQuotes = async () => {
    setIsLoading(true);
    let apiUrl = '';

    if (selectedOption === 'keyword' && quoteText.trim() !== '') {
      apiUrl = `https://api.quotable.io/search/quotes?query=${quoteText}`;
    } else if (selectedOption === 'author' && quoteText.trim() !== '') {
      apiUrl = `https://api.quotable.io/search/quotes?query=${quoteAuthor}`;
    } else {
      apiUrl = 'https://api.quotable.io/random?maxLength=40';
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        let randomQuote = {};
        if (selectedOption === 'keyword' || (selectedOption === 'author' && data.results && data.results.length > 0)) {
          let attempts = 0;
          do {
            randomQuote = data.results[Math.floor(Math.random() * data.results.length)];
            attempts += 1;
          } while (randomQuote.content.length > 40 && attempts < data.results.length);

          setQuotes(randomQuote.content.length <= 40 ? [randomQuote] : []);
        } else {
          setQuotes(Array.isArray(data.results) ? data.results : [data]);
        }
      } else {
        console.error('Invalid response structure:', data);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const designElement = document.getElementById('quotes');

    domtoimage.toPng(designElement)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'quotes.png';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 lg:p-20">
        <h2 className="lg:text-2xl lg:font-bold grid place-items-center text-cyan-900 lg:mb-8">
          Motivational Quotes
        </h2>

        <form className="grid lg:space-y-4 justify-center py-8">

          <select
            name="select"
            value={selectedOption}
            onChange={handleSelectChange}
            className="border-2 border-cyan-600 mt-2 text-cyan-900 w-full outline-none lg:w-96 lg:font-bold py-2 px-4 mx-auto text-center rounded"
          >
            <option value="">Select a quote query</option>
            <option value="random">Get a random quote</option>
            <option value="author">Search by author&apos;s name</option>
            <option value="keyword">Search by keyword</option>
          </select>

          {selectedOption === 'keyword' && (
            <div className="mb-4 w-full">
              <input
                type="text"
                placeholder="Enter your quote keyword"
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                className="p-2 border border-gray-300 outline-cyan-800 rounded w-full"
              />

              <button
                type="button"
                onClick={getQuotes}
                className="bg-cyan-600 hover:scale-95 mt-2 text-white w-full lg:font-bold py-2 px-4 rounded"
              >
                Get Quotes
              </button>
            </div>
          )}

          {selectedOption === 'author' && (
            <div className="mb-4 w-full">
              <input
                type="text"
                placeholder="Enter your quote author's name"
                value={quoteAuthor}
                onChange={(e) => setQuoteAuthor(e.target.value)}
                className="p-2 border border-gray-300 outline-cyan-800 rounded w-full"
              />
              <button
                type="button"
                onClick={getQuotes}
                className="bg-cyan-600 hover:scale-95 mt-2 text-white w-full lg:font-bold py-2 px-4 outline-none rounded"
              >
                Get Quotes
              </button>
            </div>
          )}

          {selectedOption === 'random' && (
            <div className="mb-4 w-full">
              <button
                type="button"
                onClick={getQuotes}
                className="bg-cyan-600 hover:scale-95 mt-2 text-white w-full lg:font-bold py-2 px-4 rounded"
              >
                Get a Random Quote
              </button>
            </div>
          )}

          {isLoading ? (
            <Spinner />
          ) : (
            quotes.length > 0 && (

              <div id="quotes" className="border border-gray-300 mx-auto text-center text-cyan-800 rounded p-4 mb-4">
                {quotes.map((quote, index) => (
                  <Quote key={index} text={quote.content || quote.text} />
                ))}
              </div>
            )
          )}
        </form>

        <div className="text-center mx-auto lg:mb-8">
          <button
            type="button"
            onClick={handleDownload}
            className="bg-cyan-700 hover:scale-95 cursor-pointer text-white lg:font-bold py-2 px-4 rounded mr-2"
          >
            Download
          </button>

          <Link to='/makedesigns'>
            <button
              type="button"
              className="bg-cyan-700 hover:scale-95 cursor-pointer text-white lg:font-bold py-2 px-4 mt-5 lg:mt-0 rounded"
            >
              Export for Design
            </button>
          </Link>
        </div>
        <a
          href='https://docs.quotable.io/'
          rel='noreferrer'
          target='_blank'
          className='text-sm flex justify-end mt-48 text-cyan-900 font-medium decoration-cyan-500 decoration-2 hover:underline hover:underline-offset-8'>
          Quotes powered by Quotable API
        </a>
      </div>
      <Footer />
    </div>
  );
}

GetQuotes.propTypes = {
  quotes: PropTypes.array,
  isLoading: PropTypes.bool,
  quoteText: PropTypes.string,
  text: PropTypes.string,
  quoteAuthor: PropTypes.string,
  selectedOption: PropTypes.string,
  setQuote: PropTypes.func.isRequired,
};

export default GetQuotes;

