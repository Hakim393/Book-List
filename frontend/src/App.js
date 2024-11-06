import React, { useEffect, useState } from "react";
import axios from "axios";
import BookForm from "./Components/BookForm";
import BookList from "./Components/BookList";

const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/books/${id}`);
      fetchBooks(); // Refresh the book list after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>
      <BookForm fetchBooks={fetchBooks} />
      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
};

export default App;
