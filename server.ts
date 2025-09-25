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

const PastrySchema = z
  .array(
    z.object({
      id: z.number().positive(),
      name: z.string().min(3),
      price: z.number().positive(),
    })
  )
  .refine(
    (pastry_array) => {
      //REQUIRE PASTRY IDS TO BE UNIQUE
      const ids: number[] = pastry_array.map((p) => p.id);
      const uniqueId = new Set(ids);
      return ids.length === uniqueId.size;
    },
    { message: "Pastry IDs must be unique" }
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
    id: 2,
    name: "Kladdkaka",
    price: 4,
  },
];

app.get("/pastry", (req, res) => {
  res.send(bakery);
});
