import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Import ikon ceklis hijau

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null); // State untuk menampilkan notifikasi

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/books");
        const data = await response.json();
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
      const response = await fetch(
        `http://localhost:7000/api/books/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setBooks(books.filter((book) => book.id !== bookId));
        setSuccessMessage("Buku berhasil dihapus!"); // Set notifikasi sukses
        setTimeout(() => setSuccessMessage(null), 3000); // Hapus notifikasi setelah 3 detik
      } else {
        console.error("Failed to delete the book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center text-gray-800">
        Daftar Buku
      </h2>

      {/* Notifikasi sukses */}
      {successMessage && (
        <div className="flex items-center mb-4 p-2 bg-green-200 text-green-800 rounded-lg shadow-md">
          <FaCheckCircle className="mr-2 text-lg" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform transform hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 text-xs font-bold rounded-md shadow-md">
                Rating: {book.rating}
              </div>
            </div>
            <div className="p-4 sm:p-5 space-y-2">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                {book.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">{book.genre}</p>
              <div className="flex justify-between items-center mt-2">
                <Link
                  to={`/book/${book.id}`}
                  className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-semibold transition-all"
                >
                  View Details
                </Link>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-semibold transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
