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
   - Use the provided `Supportta.postman_collection.json` file inside the `postman/` directory.
   - Or click “Import” in Postman and paste this GitHub raw URL:
     ```
     https://github.com/Ajith369369/supportta/blob/main/backend/postman/Supportta.postman_collection.json
     ```
3. **Import the environment**:
   - Use the provided `Supportta.postman_environment.json` file inside the `postman/` directory.
4. **Update Environment Values (if needed)**
   - Before sending requests related to the variables blockId, unblockId, productId, and brandId, update their values in the environment.
5. **Activate the Environment**
   - Click the dropdown next to **“No Environment”** (top-right).
   - Choose `YourEnvironment`.
   - This ensures that the variables like `{{baseUrl}}`, `{{accessToken}}`, `{{userId}}` are injected correctly into the requests.
6. **Log In and Set Tokens (if needed)**
   - If the collection requires authentication:
     - Open the **loginUser** request in the collection.
     - Send the request.
     - It will automatically store the `accessToken` and `refreshToken` into your environment.
     - All protected routes will automatically use this `accessToken` in the `Authorization` header.
     - If the access token expires, call `/api/refresh-token` to get a new one ("refreshToken" request in "Users" collection).

---

## Example API Workflows

| Action              | Endpoint                         | Method |
| ------------------- | -------------------------------- | ------ |
| Register User       | `/api/register`                  | POST   |
| Login User          | `/api/login`                     | POST   |
| Refresh Token       | `/api/refresh-token`             | POST   |
| Update User Profile | `/api/users/:id`                 | PUT    |
| Delete User Profile | `/api/users/:id`                 | DELETE |
| Block User          | `/api/users/block/:userId`       | POST   |
| Unblock User        | `/api/users/unblock/:userId`     | POST   |
| Create Brand        | `/api/brands/add-brand`          | POST   |
| Get All Brands      | `/api/brands/get-all-brands`     | GET    |
| Create Product      | `/api/products/add-product`      | POST   |
| Update Product      | `/api/products/:id`              | PUT    |
| Delete Product      | `/api/products/:id`              | DELETE |
| Get All Products    | `/api/products/get-all-products` | GET    |
| Get User's Products | `/api/products/get-my-products`  | GET    |


- [Register User](#register-user)<a id="register-user-to-top"></a>
- [Login User](#login-user)<a id="login-user-to-top"></a>
- [Refresh Token](#refresh-token)<a id="refresh-token-to-top"></a>
- [Update User Profile](#update-user-profile)<a id="update-user-profile-to-top"></a>
- [Delete User Profile](#delete-user-profile)<a id="delete-user-profile-to-top"></a>
- [Block User](#block-user)<a id="block-user-to-top"></a>
- [Unblock User](#unblock-user)<a id="unblock-user-to-top"></a>
- [Create Brand](#create-brand)<a id="create-brand-to-top"></a>
- [Get All Brands](#get-all-brands)<a id="get-all-brands-to-top"></a>
- [Create Product](#create-product)<a id="create-product-to-top"></a>
- [Update Product](#update-product)<a id="update-product-to-top"></a>
- [Delete Product](#delete-product)<a id="delete-product-to-top"></a>
- [Get All Products](#get-all-products)<a id="get-all-products-to-top"></a>
- [Get User's Products](#get-user-products)<a id="get-user-products-to-top"></a>

---

## Sample request/response for each API

### [Register User](#register-user-to-top)<a id="register-user"></a>

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

### [Login User](#login-user-to-top)<a id="login-user"></a>

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

### [Refresh Token](#refresh-token-to-top)<a id="refresh-token"></a>

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

### [Update User Profile](#update-user-profile-to-top)<a id="update-user-profile"></a>

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

### [Delete User Profile](#delete-user-profile-to-top)<a id="delete-user-profile"></a>

**Endpoint:** `DELETE /api/users/:id`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**

```json
{
  "message": "Profile deleted successfully"
}
```

---

### [Block User](#block-user-to-top)<a id="block-user"></a>

**Endpoint:** `POST /api/users/block/:userId`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**

```json
{
  "message": "User blocked successfully"
}
```

---

### [Unblock User](#unblock-user-to-top)<a id="unblock-user"></a>

**Endpoint:** `POST /api/users/unblock/:userId`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**

```json
{
  "message": "User unblocked successfully"
}
```

---

### [Create Brand](#create-brand-to-top)<a id="create-brand"></a>

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

### [Get All Brands](#get-all-brands-to-top)<a id="get-all-brands"></a>

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

### [Create Product](#create-product-to-top)<a id="create-product"></a>

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

### [Update Product](#update-product-to-top)<a id="update-product"></a>

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

### [Delete Product](#delete-product-to-top)<a id="delete-product"></a>

**Endpoint:** `DELETE /api/products/:id`  
**Headers:** `Authorization: Bearer <accessToken>`

**Sample Response:**

```json
{
  "message": "Product deleted successfully"
}
```

---

### [Get All Products](#get-all-products-to-top)<a id="get-all-products"></a> (with Filtering & Sorting)

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

### [Get User's Products](#get-user-products-to-top)<a id="get-user-products"></a>

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
