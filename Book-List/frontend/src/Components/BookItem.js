import React from "react";

const BookItem = ({ book, onDelete }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h2 className="font-bold">{book.title}</h2>
        <p>{book.author}</p>
        <p>{book.publishedYear ? book.publishedYear : "N/A"}</p>
        <p>{book.genre ? book.genre : "N/A"}</p>
      </div>
      <button onClick={() => onDelete(book.id)} className="text-red-500">
        Delete
      </button>
    </div>
  );
};

export default BookItem;
