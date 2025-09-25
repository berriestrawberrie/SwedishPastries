Here’s a clean and professional restructure of your README file using Markdown best practices, ideal for GitHub:

---

# 🧁 Swedish Pastries Bakery Management System

## 📋 Description

A Node.js-based inventory management system for a bakery specializing in traditional Swedish pastries. It uses Zod for schema validation and provides a simple API to manage pastry data.

---

## 🧪 Zod Schema Overview

The system uses Zod to validate pastry objects. Each pastry must include:

- `id`: A positive number
- `name`: A string with at least 3 characters
- `price`: A positive number (only items sold for profit)

```ts
const PastrySchema = z.array(
  z.object({
    id: z.number().positive(),
    name: z.string().min(3),
    price: z.number().positive(), // Only items sold for profit
  })
);
```

---

## 🚀 Getting Started

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/swedish-pastries-bakery.git

# Navigate into the project folder
cd swedish-pastries-bakery

# Install dependencies
npm install
```

### ▶️ Running the Server

```bash
npm run dev
```

---

## 📡 API Usage

Use an API client (like Insomnia or Postman) to test the following endpoint:

### GET `/pastry`

Returns a JSON array of three sample pastries:

```json
[
  { "id": 1, "name": "Kanelbulle", "price": 2 },
  { "id": 2, "name": "Semla", "price": 3 },
  { "id": 3, "name": "Kladdkaka", "price": 4 }
]
```

### POST `/pastry`

Adds a new pastry to the bakery inventory.

- **URL**: `http://localhost:3000/pastry`
- **Method**: `POST`
- **Request Body** (JSON):
  ```json
  {
    "name": "string",
    "price": number > 0
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "New pastry added yum!",
     [ /* updated bakery array */ ]
  }
  ```

---

### PUT `/pastry/:id`

Updates an existing pastry by ID.

- **URL**: `http://localhost:3000/pastry/:id`
- **Method**: `PUT`
- **Path Parameter**:

  - `:id` — The ID of the pastry to update

- **Request Body** (JSON):

  ```json
  {
    "name": "string",      // optional
    "price": number > 0    // optional
  }
  ```

- **Success Response**:

  ```json
  {
    "message": "Pastry #id has been updated!",
    "data": [
      /* updated bakery array */
    ]
  }
  ```

- **Error Response** (`404`):
  ```json
  {
    "message": "Pastry not found :("
  }
  ```

---

### DELETE `/pastry/:id`

Deletes a pastry from the bakery inventory by ID.

- **URL**: `http://localhost:3000/pastry/:id`
- **Method**: `DELETE`
- **Path Parameter**:

  - `:id` — The ID of the pastry to delete

- **Success Response**:

  ```json
  {
    "message": "Pastry deleted successfully!",
    "data": [
      /* updated bakery array */
    ]
  }
  ```

- **Error Response** (`404`):
  ```json
  {
    "message": "Pastry not found :(",
    "data": [
      /* no pastries deleted */
    ]
  }
  ```

---
