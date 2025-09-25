import express from "express";
import { z } from "zod";

const app = express();
//MIDDLEWARE
app.use(express.json());
const PORT: number = 3000;
//RUN SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const PastrySchema = z.array(
  z.object({
    id: z.number().positive(),
    name: z.string().min(3),
    price: z.number().positive(),
  })
);

const PastryObjectSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(3),
  price: z.number().positive(),
});

type Pastrys = z.infer<typeof PastrySchema>;
type PastryObject = z.infer<typeof PastryObjectSchema>;

let bakery: Pastrys = [
  {
    id: 1,
    name: "Kanelbulle",
    price: 2,
  },
  {
    id: 2,
    name: "Semla",
    price: 3,
  },
  {
    id: 3,
    name: "Kladdkaka",
    price: 4,
  },
];

app.get("/pastry", (req, res) => {
  res.status(200).send(bakery);
});

app.post("/pastry", (req, res) => {
  try {
    const newPastry: PastryObject = {
      id: bakery.length + 1,
      name: req.body.name,
      price: req.body.price,
    };
    bakery.push(newPastry);
    res.status(201).send({
      message: "New pastry added yum!",
      bakery,
    });
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong adding pastry to the bakery",
      error: error,
    });
  }
});

app.put("/pastry/:id", (req, res) => {
  const pastryId: number = parseInt(req.params.id);
  const found = bakery.find((p) => p.id === pastryId);
  if (!found) {
    return res.status(404).send({
      message: "Pastry not found :(",
    });
  }
  found.name = req.body.name || found.name;
  found.price = req.body.price || found.price;

  res.status(200).send({
    message: `Pastry #${pastryId} has been updated`,
    bakery,
  });
});

app.delete("/pastry/:id", (req, res) => {
  const pastryId = parseInt(req.params.id);
  const freshBakery: Pastrys = bakery.filter((p) => p.id !== pastryId);

  if (freshBakery.length === bakery.length) {
    return res.status(404).send({
      message: "Pastry not found :( no pastries deleted",
    });
  }
  bakery = freshBakery;
  res.status(200).send({
    message: "Pastry deleted successfully!",
    bakery,
  });
});
