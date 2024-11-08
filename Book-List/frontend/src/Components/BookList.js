import React from "react";
import BookItem from "./BookItem";

const BookList = ({ books, onDelete }) => {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BookList;
