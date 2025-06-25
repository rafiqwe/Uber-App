# 🛠️ User Authentication API

This section documents the authentication endpoints (`/users/register` and `/users/login`) for your Node.js application. These endpoints handle user registration and login functionality with secure password handling and JWT-based authentication.

---

## 📦 POST `/users/register`

Registers a new user and returns a **JWT token** along with user data.

### ✅ Description

This endpoint creates a new user account. It requires the user's full name, email, and password. Passwords are hashed securely using **bcrypt**, and a **JWT** is returned on successful registration.

---

### 📥 Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

---

### 📌 Field Requirements

| Field                | Type     | Required | Validation                             |
|---------------------|----------|----------|----------------------------------------|
| `fullname.firstname`| `string` | ✅ Yes   | Minimum 3 characters                   |
| `fullname.lastname` | `string` | ✅ Yes   | Minimum 3 characters *(optional logic)*|
| `email`             | `string` | ✅ Yes   | Must be a valid email format           |
| `password`          | `string` | ✅ Yes   | Minimum 6 characters                   |

---

### 📤 Success Response

#### ✅ `201 Created`

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

---

### ❌ Error Responses

#### 🔸 `400 Bad Request` (Validation Errors)

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

#### 🔸 `500 Internal Server Error`

```json
{
  "message": "Internal Server Error"
}
```

---

### 🔐 Authorization

No token required — this is a public route.

---

### 🧪 Notes

- Passwords are hashed using `bcrypt`.
- JWT is generated using `jsonwebtoken` with `process.env.JWT_SECRET`.
- Password is excluded from the response (`select: false` in Mongoose schema).

---

## 🔑 POST `/users/login`

Authenticates an existing user and returns a **JWT token** along with user details.

---

### ✅ Description

This endpoint logs in a user by verifying the provided email and password. On success, it returns a signed **JWT token** and the user's basic information.

---

### 📥 Request Body

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

---

### 📌 Field Requirements

| Field     | Type     | Required | Validation                  |
|-----------|----------|----------|-----------------------------|
| `email`   | `string` | ✅ Yes   | Must be a valid email       |
| `password`| `string` | ✅ Yes   | Minimum 6 characters        |

---

### 📤 Success Response

#### ✅ `200 OK`

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

---

### ❌ Error Responses

#### 🔸 `400 Bad Request` (Validation Errors)

```json
{
  "errors": [
    {
      "msg": "Invalid email format",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### 🔸 `401 Unauthorized`

```json
{
  "message": "Invalid email or password"
}
```

#### 🔸 `500 Internal Server Error`

```json
{
  "message": "Internal Server Error"
}
```

---

### 🔐 Authorization

No token required — public route.

---

### 🧪 Notes

- Passwords are compared securely using `bcrypt.compare`.
- JWT is signed with the user's `_id` using your secret key.
- The password field is excluded in the final response.

---


---

## 🔒 GET `/users/profile`

Fetch the authenticated user's profile information.

### ✅ Description

This endpoint returns the currently logged-in user's data. It requires a valid JWT token, which should be sent via `Cookie` or `Authorization` header.

---

### 📤 Response

#### ✅ 200 OK

```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com"
}
```

---

### ❌ 401 Unauthorized

```json
{
  "message": "Unauthorized: No token provided"
}
```

or

```json
{
  "message": "Unauthorized: Invalid token"
}
```

---

### 🔐 Authorization

- ✅ Requires a valid JWT token via:
  - Cookie: `token=<JWT>`
  - OR Header: `Authorization: Bearer <JWT>`

---

## 🚪 POST `/users/logout`

Logs out the authenticated user by clearing the cookie and blacklisting the token.

### ✅ Description

This endpoint clears the authentication token from cookies and prevents future use by blacklisting it. Useful for safely logging users out.

---

### 📤 Response

#### ✅ 200 OK

```json
{
  "message": "Logged Out"
}
```

---

### ❌ 500 Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```

---

### 🔐 Authorization

- ✅ Requires a valid JWT token via:
  - Cookie: `token=<JWT>`
  - OR Header: `Authorization: Bearer <JWT>`

---

## 🛡️ BlacklistToken Model

This model is used to **store and manage blacklisted JWT tokens** after a user logs out. It prevents the reuse of invalidated tokens and enhances the security of your authentication system.

---

### 🔍 Schema Fields

| Field       | Type   | Required | Description                                              |
|-------------|--------|----------|----------------------------------------------------------|
| `token`     | String | ✅ Yes   | The JWT token to be blacklisted. Must be unique.         |
| `createdAt` | Date   | ❌ No    | Automatically set to current time. Used for TTL expiry.  |

---

### ⏳ Expiry

- The `expires` option in the `createdAt` field ensures **MongoDB automatically deletes** the token document **24 hours after insertion**.
- This helps keep your database clean and removes stale blacklisted tokens automatically.

---

### 💡 Why Use This?

- Prevents reuse of old JWT tokens after logout.
- Helps enforce **stateless** session invalidation.
- Automatically expires old tokens using MongoDB TTL.

---

### 🧪 Notes

- Blacklisted tokens are stored to prevent reuse.
- If the user tries to access protected routes after logout, they will receive a `401 Unauthorized`.

---

# 🧑‍✈️ POST `/captain/register`

Registers a new **Captain** (driver) with personal details and vehicle information.

---

## ✅ Description

This endpoint allows captains (drivers) to register by submitting their full name, email, password, and vehicle details. It performs validation, hashes the password securely, and returns a JWT token along with the newly created captain profile.

---

## 📥 Request Body

Submit a JSON object:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Smith"
  },
  "email": "johnsmith@example.com",
  "password": "strongpass123",
  "vehicle": {
    "color": "Blue",
    "plate": "XYZ-5678",
    "capacity": 3,
    "vehicleType": "car"
  }
}
```

---

## 📌 Field Requirements

| Field                  | Type     | Required | Validation Details                                         |
|-----------------------|----------|----------|------------------------------------------------------------|
| fullname.firstname    | string   | ✅ Yes   | Minimum 3 characters                                       |
| fullname.lastname     | string   | ➖ Optional | Minimum 3 characters (optional but validated if present)   |
| email                 | string   | ✅ Yes   | Must be valid email format                                 |
| password              | string   | ✅ Yes   | Minimum 6 characters                                       |
| vehicle.color         | string   | ✅ Yes   | Minimum 3 characters                                       |
| vehicle.plate         | string   | ✅ Yes   | Minimum 3 characters                                       |
| vehicle.capacity      | integer  | ✅ Yes   | Must be at least 1                                         |
| vehicle.vehicleType   | string   | ✅ Yes   | One of: `"car"`, `"motorcycle"`, `"auto"`                  |

---

## 🛠 Internal Logic Summary

- Checks if a captain already exists using email.
- Validates all fields using `express-validator`.
- Password is hashed using `bcrypt`.
- A new captain is created using a service layer.
- JWT is generated using the captain’s `_id`.
- Token is returned along with the captain data.

---

## 📤 Success Response

### ✅ 201 Created

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "unique_captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "johnsmith@example.com",
    "password": "$2b$10$RSrM8ENvOffZxSb1eA7AyuneFJi3oiVF7XR9BrvB.YHertqPvl4WO",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ-5678",
      "capacity": 3,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

---

## ❌ Error Responses

### 🔴 400 Bad Request (Validation Errors)

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### 🔴 409 Conflict (Captain Already Exists)

```json
{
  "message": "Captain already exists"
}
```

### 🔴 500 Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```

---

## 🔐 Authorization

This route is **public** — no token is required.

---

## 🧪 Notes

- Passwords are not returned in the response due to `select: false` in the schema.
- Use the returned token for authentication in protected captain routes.
- Vehicle info is nested under `vehicle` in the captain model.
- The `status` defaults to `"inactive"` and can be updated later based on app logic.

---

