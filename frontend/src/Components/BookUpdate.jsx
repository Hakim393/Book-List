import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        const response = await axios.get(
          `http://localhost:7000/api/books/${id}`
        );
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
      await axios.put(`http://localhost:7000/api/books/${id}`, updatedBook);
      alert("Buku berhasil diperbarui");
      navigate("/");
    } catch (error) {
      setError("Gagal memperbarui buku");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-4 md:mb-6">
        Update Buku
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        {[
          {
            label: "Judul Buku",
            value: title,
            setValue: setTitle,
            type: "text",
          },
          {
            label: "Penulis",
            value: author,
            setValue: setAuthor,
            type: "text",
          },
          {
            label: "Tahun Terbit",
            value: publishedYear,
            setValue: setPublishedYear,
            type: "number",
          },
          { label: "Genre", value: genre, setValue: setGenre, type: "text" },
          {
            label: "Rating",
            value: rating,
            setValue: setRating,
            type: "number",
          },
          { label: "Harga", value: price, setValue: setPrice, type: "number" },
          {
            label: "URL Cover",
            value: coverImage,
            setValue: setCoverImage,
            type: "url",
          },
          {
            label: "Tanggal Terbit",
            value: publishDate,
            setValue: setPublishDate,
            type: "date",
          },
        ].map(({ label, value, setValue, type }, index) => (
          <div className="relative" key={index}>
            <input
              type={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition"
              required
            />
            <label className="absolute left-3 -top-3.5 text-gray-500 bg-white px-1 text-sm transition-all pointer-events-none transform -translate-y-1/2 scale-90 peer-focus:-top-4 peer-focus:scale-100">
              {label}
            </label>
          </div>
        ))}
        <div className="relative">
          <textarea
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition resize-none"
            placeholder="Sinopsis"
          ></textarea>
          <label className="absolute left-3 -top-3.5 text-gray-500 bg-white px-1 text-sm transition-all pointer-events-none transform -translate-y-1/2 scale-90 peer-focus:-top-4 peer-focus:scale-100">
            Sinopsis
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Update Buku
        </button>
      </form>
    </div>
  );
};

export default UpdateBookForm;
