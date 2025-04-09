# Supportta

## Getting Started

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
npm run dev
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

## 🛠 Example API Workflows

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

