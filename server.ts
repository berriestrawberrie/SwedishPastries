import express from "express";
import { z } from "zod";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const BookSchema = z.array(
  z.object({
    id: z.number().positive(),
    title: z.string().min(3),
    author: z.string().min(3),
  })
);
const BookObjectSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(3),
  author: z.string().min(3),
});

type Books = z.infer<typeof BookSchema>;
type BookObject = z.infer<typeof BookObjectSchema>;

let book: Books = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
  },
  {
    id: 2,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
  },
];

app.get("/books", (req, res) => {
  res.json(book);
});

app.post("/books", (req, res) => {
  const newBook: BookObject = {
    id: book.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  book.push(newBook);
  res.send({
    message: "book added successfully!",
    latest: newBook,
  });
});

app.put("/books/:id", (req, res) => {
  const bookId: number = parseInt(req.params.id);
  const found = book.find((b) => b.id === bookId);
  if (!found) {
    return res.status(404).send({
      message: "Book not found!",
    });
  }
  found.title = req.body.title || found.title;
  found.author = req.body.author || found.author;
  res.send({
    message: "Book updated successfully!",
    found,
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  book = book.filter((b) => b.id !== bookId);
  res.send({
    message: "Book deleted successfully!",
  });
});
