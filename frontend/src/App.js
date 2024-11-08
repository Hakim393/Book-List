import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "./Components/BookCard.jsx";

const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:7000/api/books");
    setBooks(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:7000/api/books/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">
        Kelola Bukumu
      </h1>
      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
};

export default App;
