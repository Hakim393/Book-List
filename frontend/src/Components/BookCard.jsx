import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();
        console.log(data); 
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("API response is not an array:", data);
          setBooks([]);  
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    
    fetchBooks();
  }, []);

  const deleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBooks(books.filter(book => book.id !== bookId));
      } else {
        console.error("Failed to delete the book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Daftar Buku</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="card bg-white border shadow-lg rounded-lg overflow-hidden">
            <img src={book.coverImage} alt={book.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.genre}</p>
              <p className="text-sm text-yellow-500">Rating: {book.rating}</p> 
              <Link 
                to={`/book/${book.id}`} 
                className="text-blue-500 mt-2 block"
              >
                View Details
              </Link>
              <button
                onClick={() => deleteBook(book.id)} 
                className="text-red-500 mt-2 block"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
