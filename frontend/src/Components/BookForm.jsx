import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const isValidUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title || !author || !price) {
      setError("Judul, Pengarang, dan Harga adalah kolom wajib.");
      setLoading(false);
      return;
    }

    if (coverImage && !isValidUrl(coverImage)) {
      setError("Harap masukkan URL gambar sampul yang valid.");
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

    try {
      const response = await axios.post(
        "http://localhost:7000/api/books",
        bookData
      );
      alert("Buku Berhasil Ditambahkan!");
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

      navigate("/");
    } catch (error) {
      console.error("Gagal menambahkan buku:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-white p-6 md:p-8 rounded-lg shadow-xl border border-gray-200 transition-transform transform hover:scale-105 duration-300">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center text-gray-800">
        Tambah Buku Baru
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul Buku"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Pengarang"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            placeholder="Tahun Terbit"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <textarea
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
            placeholder="Sinopsis"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating (0-5)"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Harga"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="URL Gambar Sampul"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <input
            type="date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            placeholder="Tanggal Terbit"
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Menambahkan...</span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
