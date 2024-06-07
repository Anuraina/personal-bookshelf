import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function SearchBooks() {
  const [book, setBook] = useState('');
  const [query,setQuery] = useState('')
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (book.trim() === '') {
        setResults([]);
        return;
      }
      const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://openlibrary.org/search.json?q=${book}&limit=10&page=1`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setResults(data.docs);
          setQuery('')
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }, 2000);

    return () => clearTimeout(debounceFetch);
  }, [book]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const handleClick = (book) => {
    let newBookshelf = [...bookshelf, book];
    setBookshelf(newBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
  };
  const handleInput=(e)=>{
    setQuery(e.target.value);
    setBook(e.target.value);
 
  }

  const isBookInBookshelf = (book) => {
    return bookshelf.some((b) => b.key === book.key);
  };

  return (
    <div className="bookshelfContainer">
      <div className='headerBookShelf'>
        <div>
          <h2>Search by book name:</h2>
          <input
            type="text"
            value={query}
            onChange={ handleInput}
            className='bookInput'
          />
        </div>
        <Link to="/bookshelf">
          <button className='addBtn'>My Bookshelf</button>
        </Link>
      </div>
      {error && <p>Error: {error}</p>}
      {loading ? (
        <div className='progress'>
          <CircularProgress color="inherit" size={100} />
        </div>
      ) : (
        <div className='bookContainer'>
          {results.map((book, index) => (
            <div className='bookCard' key={index}>
              <p><strong>Book Title: </strong>{book.title}</p>
              <p><strong>Edition Count: </strong>{book.edition_count}</p>
              <button
                className='addBtn'
                onClick={() => handleClick(book)}
                disabled={isBookInBookshelf(book)}
              >
                {isBookInBookshelf(book) ? 'Already in Bookshelf' : 'Add to Bookshelf'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBooks;
