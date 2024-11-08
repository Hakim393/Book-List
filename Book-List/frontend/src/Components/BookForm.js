import React, { useState } from "react";
import axios from "axios";

const BookForm = ({ fetchBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/api/books", {
        title,
        author,
        publishedYear: parseInt(publishedYear),
        genre,
      });
      fetchBooks(); // Fetch books after adding a new book
      setTitle("");
      setAuthor("");
      setPublishedYear("");
      setGenre("");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Nama Buku"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border rounded p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Pencipta"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        className="border rounded p-2 mr-2"
      />
      <input
        type="number"
        placeholder="Tanggal Rilis"
        value={publishedYear}
        onChange={(e) => setPublishedYear(e.target.value)}
        className="border rounded p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border rounded p-2 mr-2"
      />
      <button
        type="Simpan"
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
