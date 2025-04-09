# Supportta

## Getting Started

Please note that I did not use APIs to populate the MongoDB database. Instead, I used a seeding script to insert the initial data directly into the database for testing purposes.

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v20 or higher)
- **MongoDB** (local or cloud via MongoDB Atlas)
- **Postman** (for API testing)

---

### Installation

```bash
git clone https://github.com/Ajith369369/supportta.git
cd supportta
cd backend
npm install
```

---

### Environment Variables

Create a `.env` file in the root directory (/backend/.env):

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

> Replace the values with your actual credentials or secrets.

---

### Run the Server

```bash
npm start
```

Your server will start on `http://localhost:8000`.

---

## Testing the API with Postman

1. **Open Postman**
2. **Import the collection**:
   - Use the provided `.postman_collection.json` file inside the `postman/` directory.
   - Or click “Import” in Postman and paste this GitHub raw URL:
     ```
     https://github.com/Ajith369369/supportta/blob/main/backend/postman/Supportta.postman_collection.json
     ```

---

### Authenticated Routes

- Most routes require a valid **access token** in the `Authorization` header:
  
  ```
  Authorization: Bearer {{accessToken}}
  ```

- If the access token expires, call `/api/refresh-token` with the `refreshToken` in the request body to get a new one ("refreshToken" request in "Users" collection).

---

## Example API Workflows

| Action               | Endpoint                        | Method |
|----------------------|---------------------------------|--------|
| Register User        | `/api/register`                 | POST   |
| Login User           | `/api/login`                    | POST   |
| New Access Token     | `/api/refresh-token`            | POST   |
| Edit User Profile    | `/api/users/:id`                | PUT    |
| Delete User Profile  | `/api/users/:id`                | DELETE |
| Block User           | `/api/users/block/:userId`      | POST   |
| Unlock User          | `/api/users/unblock/:userId`    | POST   |
| Add Brand            | `/api/brands/add-brand`         | POST   |
| Get All Brands       | `/api/brands/get-all-brands`    | GET    |
| Add Product          | `/api/products/add-product`     | POST   |
| Edit Product         | `/api/products/:id`             | PUT    |
| Delete Product       | `/api/products/:id`             | DELETE |
| Get All Products     | `/api/products/get-all-products`| GET    |
| Get User's Products  | `/api/products/get-my-products` | GET    |

---

## Sample request/response for each API

### Register User

**Endpoint:** `POST /api/users/register`

**Sample Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Sample Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "67f5fa1d2a23b635bfe1162b",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

### Login User

**Endpoint:** `POST /api/users/login`

**Sample Request:**
```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Sample Response:**
```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

### Update User Profile

**Endpoint:** `PUT /api/users/:id`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Request:**
```json
{
  "username": "john_updated",
  "email": "john_updated@example.com"
}
```

**Sample Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "67f5fa1d2a23b635bfe1162b",
    "username": "john_updated",
    "email": "john_updated@example.com"
  }
}
```

---

### Delete User Profile

**Endpoint:** `DELETE /api/users/:id`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

### Block a User

**Endpoint:** `POST /api/users/block/:userId`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**
```json
{
  "message": "User blocked successfully"
}
```

---

### Unblock a User

**Endpoint:** `POST /api/users/unblock/:userId`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**
```json
{
  "message": "User unblocked successfully"
}
```

---

### Create Product

**Endpoint:** `POST /api/products`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Request:**
```json
{
  "name": "Apple iPhone 14",
  "price": 799,
  "brand": "Apple",
  "category": "Electronics",
  "description": "Latest iPhone with advanced features"
}
```

**Sample Response:**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "67f6a12b2b1234abcdef123",
    "name": "Apple iPhone 14",
    "price": 799,
    "brand": "Apple",
    "category": "Electronics",
    "description": "Latest iPhone with advanced features",
    "createdBy": "67f5fa1d2a23b635bfe1162b"
  }
}
```

---

### Get All Products (with Filtering & Sorting)

**Endpoint:** `GET /api/products?brand=Apple&category=Electronics&sort=price&order=asc`

**Sample Response:**
```json
[
  {
    "_id": "67f6a12b2b1234abcdef123",
    "name": "Apple iPhone 14",
    "price": 799,
    "brand": "Apple",
    "category": "Electronics",
    "description": "Latest iPhone with advanced features",
    "createdBy": "67f5fa1d2a23b635bfe1162b"
  },
  {
    "_id": "67f6a12b2b1234abcdef124",
    "name": "Apple Watch Series 8",
    "price": 399,
    "brand": "Apple",
    "category": "Electronics",
    "description": "Advanced smartwatch by Apple",
    "createdBy": "67f5fa1d2a23b635bfe1162b"
  }
]
```

---

### Get Product by ID

**Endpoint:** `GET /api/products/:id`

**Sample Response:**
```json
{
  "_id": "67f6a12b2b1234abcdef123",
  "name": "Apple iPhone 14",
  "price": 799,
  "brand": "Apple",
  "category": "Electronics",
  "description": "Latest iPhone with advanced features",
  "createdBy": "67f5fa1d2a23b635bfe1162b"
}
```

---

### Update Product

**Endpoint:** `PUT /api/products/:id`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Request:**
```json
{
  "price": 749,
  "description": "Updated price for promotion"
}
```

**Sample Response:**
```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "67f6a12b2b1234abcdef123",
    "name": "Apple iPhone 14",
    "price": 749,
    "brand": "Apple",
    "category": "Electronics",
    "description": "Updated price for promotion"
  }
}
```

---

### Delete Product

**Endpoint:** `DELETE /api/products/:id`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---