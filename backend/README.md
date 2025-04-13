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

| Action              | Endpoint                         | Method |
| ------------------- | -------------------------------- | ------ |
| [Register User](#Register-User↓)<a id="Register-User↑"></a>       | `/api/register`                  | POST   |
| [Login User](#Login_User↓)<a id="Login_User↑"></a>          | `/api/login`                     | POST   |
| Refresh Token       | `/api/refresh-token`             | POST   |
| Update User Profile | `/api/users/:id`                 | PUT    |
| Delete User Profile | `/api/users/:id`                 | DELETE |
| Block User          | `/api/users/block/:userId`       | POST   |
| Unlock User         | `/api/users/unblock/:userId`     | POST   |
| Create Brand        | `/api/brands/add-brand`          | POST   |
| Get All Brands      | `/api/brands/get-all-brands`     | GET    |
| Create Product      | `/api/products/add-product`      | POST   |
| Update Product      | `/api/products/:id`              | PUT    |
| Delete Product      | `/api/products/:id`              | DELETE |
| Get All Products    | `/api/products/get-all-products` | GET    |
| Get User's Products | `/api/products/get-my-products`  | GET    |








---

## Sample request/response for each API

### [Register User](#Register-User↑)<a id="Register-User↓"></a>

**Endpoint:** `POST /api/users/register`

**Sample Request:**

```json
{
  "username": "Max",
  "email": "max@example.com",
  "password": "max123",
  "profilePhoto": "https://example.com/photos/max.jpg",
  "blockedUsers": []
  }
}
```

**Sample Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "username": "Max",
    "email": "max@example.com",
    "password": "$2b$10$rITFP5xSTuJuDDV1ZMRmVuZtpY2kKDWtdIjKqViGWQ.CMfzqs8yPC",
    "profilePhoto": "https://example.com/photos/max.jpg",
    "blockedUsers": [],
    "_id": "67f641f932d72418fc5813e7",
    "__v": 0
  }
}
```

---

### [Login User](#Login_User↑)<a id="Login_User↓"></a>

**Endpoint:** `POST /api/users/login`

**Sample Request:**

```json
{
  "email": "max@example.com",
  "password": "max123"
}
```

**Sample Response:**

```json
{
  "message": "Login successful",
  "user": {
    "id": "67f5fa1d2a23b635bfe1162b",
    "username": "Max",
    "email": "max@example.com",
    "accessToken": "eyJhbGciOiJIUzI1N..."
  }
}
```

---

### Refresh Token

**Endpoint:** `POST /api/refresh-token`  
**Headers:** `No Authorization header required`

**Sample Request:** `(No body needed if refresh token is in cookies)`

```json
{}
```

**Sample Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1N..."
}
```

---

### Update User Profile

**Endpoint:** `PUT /api/users/:id`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Request:**

```json
{
  "username": "Max",
  "email": "max222@example.com",
  "profilePhoto": "https://example.com/photos/max.jpg"
}
```

**Sample Response:**

```json
{
  "message": "Profile updated",
  "user": {
    "_id": "67f5fa1d2a23b635bfe1162b",
    "username": "Max",
    "email": "max222@example.com",
    "password": "$2b$10$Bt3vTx0RC3Tts1pmzLdEz.3mWMJtq0VqBGzTwudbUTklsI/S5iNYK",
    "profilePhoto": "https://example.com/photos/max.jpg",
    "blockedUsers": [],
    "__v": 2
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
  "message": "Profile deleted successfully"
}
```

---

### Block User

**Endpoint:** `POST /api/users/block/:userId`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**

```json
{
  "message": "User blocked successfully"
}
```

---

### Unblock User

**Endpoint:** `POST /api/users/unblock/:userId`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**

```json
{
  "message": "User unblocked successfully"
}
```

---

### Create Brand

**Endpoint:** `POST /api/brands/add-brand`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Request:**

```json
{
  "brandName": "SoundCoreY",
  "brandLogo": "https://example.com/logos/soundcore.png",
  "categories": ["Electronics"]
}
```

**Sample Response:**

```json
{
  "message": "Brand created successfully",
  "brand": {
    "brandName": "SoundCoreY",
    "brandLogo": "https://example.com/logos/soundcore.png",
    "categories": ["Electronics"],
    "_id": "67f647b3768f0aaf9f7bfb1d",
    "__v": 0
  }
}
```

---

### Get All Brands

**Endpoint:** `GET /api/brands/get-all-brands`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**

```json
[
  {
    "_id": "67f5cdf4133dda43f538a408",
    "brandName": "SoundCore",
    "brandLogo": "https://example.com/logos/soundcore.png",
    "categories": ["Electronics"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a409",
    "brandName": "Nike",
    "brandLogo": "https://example.com/logos/nike.png",
    "categories": ["Footwear"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a40a",
    "brandName": "FitBit",
    "brandLogo": "https://example.com/logos/fitbit.png",
    "categories": ["Wearables"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a40c",
    "brandName": "JBL",
    "brandLogo": "https://example.com/logos/jbl.png",
    "categories": ["Electronics"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a40d",
    "brandName": "Gaiam",
    "brandLogo": "https://example.com/logos/gaiam.png",
    "categories": ["Fitness"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a40e",
    "brandName": "Logitech",
    "brandLogo": "https://example.com/logos/logitech.png",
    "categories": ["Accessories"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a40f",
    "brandName": "Hydro Flask",
    "brandLogo": "https://example.com/logos/hydroflask.png",
    "categories": ["Home & Kitchen"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a411",
    "brandName": "Sony",
    "brandLogo": "https://example.com/logos/sony.png",
    "categories": ["Electronics"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a412",
    "brandName": "Bowflex",
    "brandLogo": "https://example.com/logos/bowflex.png",
    "categories": ["Fitness"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a413",
    "brandName": "Samsung",
    "brandLogo": "https://example.com/logos/samsung.png",
    "categories": ["Electronics"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a414",
    "brandName": "Samsonite",
    "brandLogo": "https://example.com/logos/samsonite.png",
    "categories": ["Accessories"],
    "__v": 0
  },
  {
    "_id": "67f5cdf4133dda43f538a415",
    "brandName": "Philips",
    "brandLogo": "https://example.com/logos/philips.png",
    "categories": ["Home & Kitchen"],
    "__v": 0
  },
  {
    "_id": "67f60215a0ebd97bf41f1f48",
    "brandName": "SoundCoreX",
    "brandLogo": "https://example.com/logos/soundcore.png",
    "categories": ["Electronics"],
    "__v": 0
  }
]
```

---

### Create Product

**Endpoint:** `POST /api/products/add-product`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Request:**

```json
{
  "productName": "Wireless Headphones Mini",
  "description": "Over-ear noise cancelling headphones with 30 hours battery life.",
  "price": 129.99,
  "category": "Electronics",
  "brand": "Sony",
  "productImage": "https://example.com/images/headphones.jpg",
  "addedBy": "67f5fa1d2a23b635bfe1162b"
}
```

**Sample Response:**

```json
{
  "message": "Product added successfully",
  "product": {
    "productName": "Wireless Headphones Mini",
    "description": "Over-ear noise cancelling headphones with 30 hours battery life.",
    "price": 129.99,
    "category": "Electronics",
    "brand": "Sony",
    "productImage": "https://example.com/images/headphones.jpg",
    "addedBy": "67f5fa1d2a23b635bfe1162b",
    "_id": "67f647ec768f0aaf9f7bfb20",
    "__v": 0
  }
}
```

---

### Update Product

**Endpoint:** `PUT /api/products/:id`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Request:**

```json
{
  "productName": "Wireless Headphones121",
  "description": "Over-ear noise cancelling headphones with 30 hours battery life.",
  "price": 129.99,
  "category": "Electronics",
  "brand": "Sony",
  "productImage": "https://example.com/images/headphones.jpg",
  "addedBy": "67f641f932d72418fc5813e7"
}
```

**Sample Response:**

```json
{
  "_id": "67f7c73bf085d460b23ecab7",
  "productName": "Wireless Headphones121",
  "description": "Over-ear noise cancelling headphones with 30 hours battery life.",
  "price": 129.99,
  "category": "Electronics",
  "brand": "Sony",
  "productImage": "https://example.com/images/headphones.jpg",
  "addedBy": "67f641f932d72418fc5813e7",
  "__v": 0
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

### Get All Products (with Filtering & Sorting)

**Endpoint:** `GET /api/products/get-all-products?brand=Sony&category=Electronics&sortBy=price&order=asc`

**Sample Response:**

```json
[
  {
    "_id": "67f5cb84dad77cfa0cb0c046",
    "productName": "Wireless Headphones",
    "description": "Over-ear noise cancelling headphones with 30 hours battery life.",
    "price": 129.99,
    "category": "Electronics",
    "brand": "Sony",
    "productImage": "https://example.com/images/headphones.jpg",
    "addedBy": {
      "_id": "67f5c209623f10da06a1cef5",
      "username": "Charlie"
    },
    "__v": 0,
    "createdAt": "2025-04-09T01:21:08.094Z",
    "updatedAt": "2025-04-09T01:21:08.094Z"
  },
  {
    "_id": "67f647ec768f0aaf9f7bfb20",
    "productName": "Wireless Headphones Mini",
    "description": "Over-ear noise cancelling headphones with 30 hours battery life.",
    "price": 129.99,
    "category": "Electronics",
    "brand": "Sony",
    "productImage": "https://example.com/images/headphones.jpg",
    "addedBy": null,
    "__v": 0
  },
  {
    "_id": "67f64987768f0aaf9f7bfb2a",
    "productName": "Wireless Headphones Mini",
    "description": "Over-ear noise cancelling headphones with 30 hours battery life.",
    "price": 129.99,
    "category": "Electronics",
    "brand": "Sony",
    "productImage": "https://example.com/images/headphones.jpg",
    "addedBy": null,
    "__v": 0
  }
]
```

---

### Get User's Products

**Endpoint:** `GET /api/products/get-my-products`

**Sample Response:**

```json
[
  {
    "_id": "67f64b59768f0aaf9f7bfb3e",
    "productName": "Wireless Headphones Asb",
    "description": "Over-ear noise cancelling headphones with 30 hours battery life.",
    "price": 129.99,
    "category": "Electronics",
    "brand": "Sony",
    "productImage": "https://example.com/images/headphones.jpg",
    "addedBy": "67f641f932d72418fc5813e7",
    "__v": 0
  }
]
```

---
