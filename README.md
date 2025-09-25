# Swedish Pastries Bakery Management System

## Description

This project manages inventory for a bakery specializing in Swedish pastries.

## Zod Schema Explanation

- `PastrySchema`: Validates the structure of pastry objects, ensuring each has an 'id', 'name', and 'price'. It also insures the data meets minimum requirements for entry into the system as explained below

const PastrySchema = z.array(
z.object({
id: z.number().positive(),
name: z.string().min(3),
price: z.number().positive(), //Only items that are sold for profit
})
).refine()//additional refine to insure item ids are unique

## Running the Code

-Clone the git repository
-Install the dependencies
-Run the server with: npm run dev

## Using APIs

Using a API client you can test the following:

(GET)
http://localhost:3000/pastry
-Result should be a JSON with (3) bakery items: Kanelbulle, Semla, and Kladdkaka
