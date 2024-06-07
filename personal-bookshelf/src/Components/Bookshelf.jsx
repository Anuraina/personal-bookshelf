import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Bookshelf() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBooks);
  }, []);

  return (
    <div className="bookshelfContainer">
      <h1>My Bookshelf</h1>
     <Link to='/'> <button className='addBtn'>Add More Books</button></Link>
      <div className='bookContainer'>
        {bookshelf.map((book, index) => (
          <div className='bookCard' key={index}>
            <p><strong>Book Title: </strong>{book.title} </p>
            <p><strong>Edition Count: </strong>{book.edition_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookshelf;
