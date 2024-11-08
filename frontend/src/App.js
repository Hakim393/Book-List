import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "./Components/BookCard.jsx";

const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:5000/api/books");
    setBooks(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Kelola Bukumu</h1>
      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
};

export default App;
