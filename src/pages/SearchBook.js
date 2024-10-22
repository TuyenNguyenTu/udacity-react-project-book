import React, { useEffect, useState } from 'react'
import BookItems from '../components/BookItems';
import { Link } from 'react-router-dom';
import * as BooksAPI from "../BookApi";

export default function SearchBook() {
  const [query, setquery] = useState(null);
  const [books, setbooks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query && query.length > 0) {
      setIsLoading(true);
      BooksAPI.search(query).then(searchBooks => {
        if (!searchBooks.error) {
          BooksAPI.getAll().then(allBooks => {
            const newBooks = searchBooks.map(item => {
              const book = allBooks.find(x => x.id === item.id);
              if (book) return { ...item, shelf: book.shelf }
              else return { ...item, shelf: 'none' }
            })
            setbooks([...newBooks])
          })
        } else {
          setbooks([])
        }
      }).finally(() => { setIsLoading(false); })

    } else {
      setbooks([])
    }
  }, [query])

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to='/' className="close-search" >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => setquery(event.target.value)}
          />
        </div>
      </div>
     
      <div className="search-books-results">
      {isLoading && <div className="loader-container"><div class="loader"></div></div>}
        {books && books.length > 0 && (<ol className="books-grid">
          {
            books.map((item, index) => (<li key={index}>
              <BookItems book={item} />
            </li>))
          }
        </ol>)}
        {books !== null && books.length === 0 && query && <span>No record found</span>}
      </div>

    </div>
  )
}
