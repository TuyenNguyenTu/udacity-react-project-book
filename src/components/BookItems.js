import React from 'react'
import PropTypes from 'prop-types';
import * as BooksAPI from "../BookApi";

export default function BookItems(props) {
    const bookshelfs = [
        { label: ' Move to...', value: 'None', disable: true },
        { label: 'Currently Reading', value: 'currentlyReading', disable: false },
        { label: 'Want to Read', value: 'wantToRead', disable: false },
        { label: 'Read', value: 'read', disable: false },
        { label: 'None', value: 'none' }
    ]
    const { book } = props
    const handleChange = event => {
        BooksAPI.update(book, event.target.value).then(res => {
            if (props.updateBook)
                props.updateBook(book)
        })

    };
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks?.thumbnail})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={handleChange} value={book.shelf}>
                        {bookshelfs && bookshelfs.map((item, index) =>
                            <option key={index} value={item.value} disabled={item.disable}>
                                {item.label}
                            </option>
                        )}

                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book?.authors?.join(', ')}</div>
        </div>
    )
}

BookItems.propTypes = {
    book: PropTypes.object,
    updateBook: PropTypes.func
}