import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:5000/api/books/${id}`);
      const data = await response.json();
      setBook(data);
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold text-center">{book.title}</h2>
      <div className="relative">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="h-96 object-cover rounded-lg shadow-lg ml-auto mr-auto" 
        />
      </div>
      <div className="space-y-4">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Published Year:</strong> {book.publishedYear}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Sinopsis:</strong> {book.sinopsis}</p>
        <p><strong>Rating:</strong> {book.rating}</p>
        <p><strong>Price:</strong> Rp.{book.price}</p>
        <p><strong>Published:</strong> {new Date(book.publishDate).toLocaleDateString()}</p>
      </div>

      <div className="text-center mt-6">
        <Link
          to={`/update/${id}`}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Update Info Buku
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;
