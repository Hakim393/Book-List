const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
require("dotenv").config();

// Middleware
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("SELAMAT DATANG DI API KAMI !");
});

// Endpoint CRUD untuk Buku
app.post("/api/books", async (req, res) => {
  const { title, author, publishedYear, genre } = req.body;
  const book = await prisma.book.create({
    data: { title, author, publishedYear, genre },
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
    res.status(404).json({ error: "Book not found" });
  }
});

app.put("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, publishedYear, genre } = req.body;
  const book = await prisma.book.update({
    where: { id: parseInt(id) },
    data: { title, author, publishedYear, genre },
  });
  res.json(book);
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
