# `1. $nin: blockedByUserIds`
```js
addedBy: { $nin: blockedByUserIds }
```

- **`$nin`** stands for "**not in**" in MongoDB.
- This line tells MongoDB:
  > “Find all products where the `addedBy` field (i.e., the user who created the product) is **NOT** in the list of `blockedByUserIds`.”
- So you're **excluding** products added by users who have **blocked** the currently logged-in user.

---

# `2. if (brand) query.brand = brand;`
```js
if (brand) query.brand = brand;
```

- This dynamically **adds a `brand` filter** to your MongoDB query **only if** `brand` is provided in the request query string (`req.query.brand`).
- So, if a user sends `/products?brand=Nike`, it will only fetch products with `brand: "Nike"`.

---

# `3. Sorting Logic`
```js
if (sortBy === "price" || sortBy === "product-name") {
  sortOptions[sortBy === "product-name" ? "productName" : "price"] = order === "asc" ? 1 : -1;
}
```

- This builds a `sortOptions` object dynamically depending on what the user passes in `req.query.sortBy` and `order`.
- If the user sends:
  - `/products?sortBy=price&order=asc`, it will sort by `price` **ascending**.
  - `/products?sortBy=product-name&order=desc`, it will sort by `productName` **descending**.
- The `?` ternary operator decides which field to use:
  - If `sortBy` is `"product-name"`, it sets the key to `"productName"`.
  - Otherwise, it's `"price"`.
- Then the `order` decides whether to use `1` (ascending) or `-1` (descending).

---

# `4. Populating User Info`
```js
const products = await Product.find(query)
  .populate("addedBy", "username")
  .sort(sortOptions);
```

- `.populate("addedBy", "username")`:
  - Joins data from the **User** model into the `Product` results.
  - It **replaces the `addedBy` user ID** in each product with the user's **username**.
  - So the product will now include:
    ```js
    {
      productName: "Shoes",
      addedBy: {
        _id: "...",
        username: "john_doe"
      }
    }
    ```
