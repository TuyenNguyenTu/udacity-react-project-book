import React from 'react'
import BookItems from './BookItems'
import PropTypes from 'prop-types';

export default function BookShelf(props) {
  const { bookshelfTitle, books } = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && books.map((item,index) => (<li key={index}>
            <BookItems book={item} updateBook={() => props.updateBook()}/>
          </li>))}

        </ol>
      </div>
    </div>
  )
}


BookItems.propTypes = {
  bookshelfTitle : PropTypes.string,
  books: PropTypes.array,
}