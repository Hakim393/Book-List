import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 

const UpdateBookForm = () => {
  const { id } = useParams(); 
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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        const book = response.data;

        setTitle(book.title);
        setAuthor(book.author);
        setPublishedYear(book.publishedYear || "");
        setGenre(book.genre || "");
        setSinopsis(book.sinopsis || "");
        setRating(book.rating || "");
        setPrice(book.price || "");
        setCoverImage(book.coverImage || "");
        setPublishDate(book.publishDate || "");
      } catch (error) {
        setError("Gagal memuat data buku");
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBook = {
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
      await axios.put(`http://localhost:5000/api/books/${id}`, updatedBook);
      alert("Buku berhasil diperbarui");
    } catch (error) {
      setError("Gagal memperbarui buku");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Update Buku</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul Buku"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Penulis"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            placeholder="Tahun Terbit"
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
            placeholder="Rating"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Harga"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="URL Cover"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            placeholder="Tanggal Terbit"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBookForm;
