import { useState } from "react";
import axios from "axios";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [genre, setGenre] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title || !author || !price) {
      setError("Title, Author, and Price are required fields.");
      setLoading(false);
      return;
    }

    if (coverImage && !isValidUrl(coverImage)) {
      setError("Please provide a valid URL for the Cover Image.");
      setLoading(false);
      return;
    }

    const bookData = {
      title,
      author,
      publishedYear: publishedYear || null,
      genre: genre || null,
      sinopsis: sinopsis || null,
      rating: rating || null,
      price: parseFloat(price),
      coverImage: coverImage || null,
      publishDate: publishDate ? new Date(publishDate).toISOString() : null,
    };
      const response = await axios.post("http://localhost:5000/api/books", bookData);
      alert("Buku Berhasil Ditambahkan");
      console.log(response.data);
      setTitle("");
      setAuthor("");
      setPublishedYear("");
      setGenre("");
      setSinopsis("");
      setRating("");
      setPrice("");
      setCoverImage("");
      setPublishDate("");
      console.error("Error creating book:", error);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Tambah Buku Baru</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            placeholder="Published Year"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <textarea
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
            placeholder="Sinopsis"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating (0-5)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Cover Image URL"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            placeholder="Publish Date"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
