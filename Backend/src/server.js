const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
require("dotenv").config();

// Midleware
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Nambahin 
app.post("/api/books", async (req, res) => {
  const { title, author, publishedYear, genre, sinopsis, rating, price, coverImage, publishDate } = req.body;
  const book = await prisma.book.create({
    data: {title, author, publishedYear: publishedYear ? parseInt(publishedYear) : null, 
      genre, sinopsis, rating, price, coverImage, publishDate,},
  });
  res.json(book);
});


app.get("/api/books", async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

app.get("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const book = await prisma.book.findUnique({
    where: { id: parseInt(id) },
  });
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Buku Tidak Ditemukan" });
  }
});

app.put("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, publishedYear, genre, sinopsis, rating, price, coverImage, publishDate } = req.body;

  try {
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        publishedYear: publishedYear || null,
        genre: genre || null,
        sinopsis: sinopsis || null,
        rating: rating || null,
        price: price,
        coverImage: coverImage || null,
        publishDate: publishDate ? new Date(publishDate) : null,
      },
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Gagal Update", details: error.message });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.book.delete({
    where: { id: parseInt(id) },
  });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  console.log("Disconnected from database");
  process.exit(0);
});
