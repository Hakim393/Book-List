import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:7000/api/books/${id}`);
      const data = await response.json();
      setBook(data);
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <div className="text-center py-10 text-gray-500 font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-center text-gray-800">
        {book.title}
      </h2>

      <div className="flex flex-col lg:flex-row lg:space-x-8 mt-4 space-y-4 lg:space-y-0">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-52 w-full sm:h-64 md:h-80 lg:w-1/3 object-cover rounded-lg shadow-md border border-gray-300"
        />

        <div className="space-y-3 lg:w-2/3">
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Published Year:</strong> {book.publishedYear}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Genre:</strong> {book.genre}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Sinopsis:</strong> {book.sinopsis}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Rating:</strong> {book.rating}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Price:</strong> Rp.{book.price}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Published:</strong>{" "}
            {new Date(book.publishDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          to={`/update/${id}`}
          className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-md"
        >
          Update Info Buku
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;
