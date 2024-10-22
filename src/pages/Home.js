import React, { useEffect, useState } from 'react'
import * as BooksAPI from "../BookApi";
import BookShelf from '../components/BookShelf';
import { Link } from 'react-router-dom';

export default function Home() {
  const bookshelfs = [
    { shelfTitle: "Currently Reading", shelfName: "currentlyReading" },
    { shelfTitle: "Want to Read", shelfName: "wantToRead" },
    { shelfTitle: "Read", shelfName: "read" }
  ];
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [])
  const getData = () => {
    BooksAPI.getAll().then(book => {
      setBookList(book)
    }).finally(() => { setIsLoading(false); })
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads: A Book Tracking App</h1>
      </div>
      <div className="list-books-content">
        {isLoading && <div className="loader-container"><div class="loader"></div></div>}
        <div>
          {bookshelfs && bookshelfs.map((item, index) =>
            <BookShelf key={index} bookshelfTitle={item.shelfTitle} books={bookList.filter(x => x.shelf === item.shelfName)} updateBook={() => getData()} />
          )}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}
