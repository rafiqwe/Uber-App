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

# 🧑‍✈️ Captain Authentication API

APIs to handle captain login, profile retrieval, and logout functionality.

---

## 🔐 POST `/captain/login`

Authenticate a registered captain and return a JWT token.

### ✅ Description

This endpoint verifies captain credentials (email and password). If valid, it returns a JWT token and the captain’s profile. The token is also set in cookies.

---

### 📥 Request Body

```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

### 📌 Field Requirements

| Field     | Type   | Required | Validation                      |
|-----------|--------|----------|----------------------------------|
| email     | string | ✅ Yes   | Must be a valid email format     |
| password  | string | ✅ Yes   | Minimum 6 characters             |

---

### 📤 Success Response – 200 OK

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "captain@example.com",
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

### ❌ Error Responses

#### 400 – Validation Errors

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### 401 – Invalid Credentials

```json
{
  "message": "Invalid email or password"
}
```

---

## 👤 GET `/captain/profile`

Returns the profile of the currently authenticated captain.

### 🔐 Authentication Required

JWT token must be provided in either:
- Cookie: `token`
- Header: `Authorization: Bearer <token>`

---

### 📤 Success Response – 200 OK

```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "captain@example.com",
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

### ❌ Error Responses

#### 401 – No Token / Invalid Token / Not Found

```json
{
  "message": "Unauthorized: No token provided"
}
```

```json
{
  "message": "Unauthorized: captain not found"
}
```

---

## 🔓 GET `/captain/logout`

Logs out the captain by clearing the token and blacklisting it.

---

### 🔐 Authentication Required

Must include the JWT token in either cookies or `Authorization` header.

---

### 📤 Success Response – 200 OK

```json
{
  "message": "Logout successfully"
}
```

---

### ❌ Error Response – 500

```json
{
  "message": "Internal Server Error"
}
```

---

## ⚠️ Token Blacklisting

- When a captain logs out, their JWT token is saved in a blacklist.
- Any further use of a blacklisted token will result in unauthorized access (`401`).

---

## 🧠 Notes

- Passwords are not returned thanks to `select: false` in the model.
- Tokens expire after `24h`.
- `authCaptain` middleware validates and attaches the authenticated captain to `req.captain`.

---



# 🗺️ Map API Endpoints

These endpoints provide geolocation, route distance/time estimation, and address autocomplete suggestions using Nominatim and OpenRouteService.

All routes are protected — valid JWT token required.

---

## 📍 GET `/map/get-coordinates`

Returns the latitude and longitude of a given address.

### 🔐 Protected  
✅ Requires Auth Token (cookie or `Authorization: Bearer <token>`)

### 🧾 Query Parameters

| Name    | Type   | Required | Description                   |
|---------|--------|----------|-------------------------------|
| address | string | ✅ Yes   | Any valid address (3+ chars)  |

### 🧪 Example

```
GET /map/get-coordinates?address=Dhaka
```

### ✅ Success Response

```json
{
  "lat": 23.8103,
  "lng": 90.4125
}
```

### ❌ Error Responses

- `400 Bad Request` – If the address is missing or too short.
- `404 Not Found` – If no coordinates found.
- `401 Unauthorized` – If token is missing or blacklisted.

---

## 🚗 GET `/map/get-distance-time`

Returns estimated distance and time between two addresses.

### 🔐 Protected  
✅ Requires Auth Token

### 🧾 Query Parameters

| Name        | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| origin      | string | ✅ Yes   | Starting address (3+ chars)          |
| destination | string | ✅ Yes   | Destination address (3+ chars)       |

### 🧪 Example

```
GET /map/get-distance-time?origin=Dhaka&destination=Chittagong
```

### ✅ Success Response

```json
{
  "distance": "245.12 km",
  "duration": "340.6 mins"
}
```

### ❌ Error Responses

- `400 Bad Request` – If origin or destination is invalid.
- `500 Internal Server Error` – If distance/time could not be calculated.
- `401 Unauthorized` – If not authenticated.

---

## ✨ GET `/map/get-suggestions`

Returns autocomplete address suggestions based on user input.

### 🔐 Protected  
✅ Requires Auth Token

### 🧾 Query Parameters

| Name  | Type   | Required | Description                    |
|-------|--------|----------|--------------------------------|
| input | string | ✅ Yes   | Partial address (3+ characters)|

### 🧪 Example

```
GET /map/get-suggestions?input=Baris
```

### ✅ Success Response

```json
[
  {
    "display_name": "Barisal, Bangladesh",
    "lat": "22.7",
    "lng": "90.3",
    "type": "city",
    "class": "place",
    "address": {
      "city": "Barisal",
      "country": "Bangladesh"
    }
  },
  ...
]
```

### ❌ Error Responses

- `400 Bad Request` – If input is missing or too short.
- `500 Internal Server Error` – If fetch fails.
- `401 Unauthorized` – If not authenticated.

---

### 📌 Notes

- All APIs rely on third-party services:  
  - [Nominatim OpenStreetMap](https://nominatim.openstreetmap.org/) for address search.
  - [OpenRouteService](https://openrouteservice.org/) for route calculations.
- Use an appropriate `User-Agent` when making requests to Nominatim (compliant with their usage policy).

---

**Made for 🚖 Uber Clone – Map Functionality**



# 🚕 Ride API — Create Ride

This endpoint allows a user to request a ride by providing pickup and destination addresses and selecting a vehicle type. The backend calculates the fare and returns the ride details with a generated OTP.

---

## 📌 Model: Ride

| Field        | Type                     | Required | Description |
|--------------|--------------------------|----------|-------------|
| `user`       | ObjectId (User)          | ✅ Yes   | User who requested the ride |
| `captain`    | ObjectId (Captain)       | ❌ No    | Captain who accepts the ride |
| `pickup`     | String                   | ✅ Yes   | Starting address |
| `destination`| String                   | ✅ Yes   | Ending address |
| `fare`       | Number                   | ✅ Yes   | Calculated based on distance and time |
| `status`     | Enum                     | ❌ No    | Ride status (default: `pending`) <br> Values: `pending`, `accepted`, `ongoing`, `completed`, `cancelled` |
| `duration`   | Number                   | ❌ No    | Estimated time (in minutes) |
| `destance`   | Number                   | ❌ No    | Estimated distance (in kilometers) |
| `paymentID`  | String (typo: `trype`)   | ❌ No    | Payment identifier (if used) |
| `orderID`    | String                   | ❌ No    | Order ID from payment gateway |
| `signature`  | String                   | ❌ No    | Payment signature |
| `vehicleType`| Enum                     | ✅ Yes   | Options: `auto`, `moto`, `car` |
| `otp`        | String                   | ✅ Yes   | 6-digit OTP generated for ride (hidden by default) |

---

## 🎯 Endpoint: `POST /ride/create`

Creates a new ride request.

### 🔐 Authentication  
✅ Requires user token (JWT via cookie or `Authorization` header)

### 🧾 Request Body (JSON)

| Field         | Type   | Required | Validation                              |
|---------------|--------|----------|------------------------------------------|
| `pickup`      | String | ✅ Yes   | Minimum 3 characters                     |
| `destination` | String | ✅ Yes   | Minimum 3 characters                     |
| `vehicleType` | String | ✅ Yes   | Must be one of: `auto`, `moto`, `car`    |

### 🧪 Example Request

```json
{
  "pickup": "Banani, Dhaka",
  "destination": "Dhanmondi, Dhaka",
  "vehicleType": "car"
}
```

---

### ✅ Success Response

**Status**: `201 Created`

```json
{
  "_id": "6658a5ed48f332a4b69346a7",
  "user": "6658a5db48f332a4b69346a5",
  "pickup": "Banani, Dhaka",
  "destination": "Dhanmondi, Dhaka",
  "fare": "220.00",
  "status": "pending",
  "vehicleType": "car",
  "otp": "******",
  "__v": 0
}
```

> ℹ️ OTP is hidden by default (`select: false` in schema) when fetched from database.

---

### ❌ Error Responses

| Status | Message                               |
|--------|----------------------------------------|
| 400    | Validation errors (e.g., short input) |
| 500    | Internal server error or service issues|

---

## ⚙️ Fare Calculation Logic

Based on distance and duration fetched from OpenRouteService:

| Vehicle   | Per KM | Per Minute |
|-----------|--------|------------|
| Auto      | 5      | 0.5        |
| Moto      | 4      | 0.4        |
| Car       | 10     | 1.0        |

Formula:
```
fare = (distanceInKm * perKm) + (durationInMin * perMin)
```

---

## 🔐 OTP Generation

A secure 6-digit random OTP is generated using Node.js `crypto.randomInt`:

```js
getOtp = (num) => crypto.randomInt(10**(num-1), 10**num).toString();
```

---

## 🚧 Known Issues

- Typo in schema: `trype` ➜ should be `type` in `paymentID`
- `destance` ➜ should be `distance` for clarity

---



# 💰 Get Fare Estimate API

This endpoint allows authenticated users (riders or drivers) to estimate the ride fare before booking, based on pickup and destination locations and selected vehicle type.

---

## 🎯 Endpoint: `GET /ride/get-fare`

Returns the calculated fare by using real-world distance and estimated duration via OpenRouteService.

### 🔐 Authentication  
✅ Required — user must be logged in

---

## 🧾 Query Parameters

| Name           | Type   | Required | Description                                    |
|----------------|--------|----------|------------------------------------------------|
| `pickup`       | String | ✅ Yes   | Starting address (min 3 characters)            |
| `destination`  | String | ✅ Yes   | Ending address (min 3 characters)              |
| `vehicleType`  | String | ✅ Yes   | Must be one of: `auto`, `moto`, `car`          |

---

### 🧪 Example Request

```
GET /ride/get-fare?pickup=Uttara,+Dhaka&destination=Banani,+Dhaka&vehicleType=car
Authorization: Bearer <token>
```

---

## ✅ Success Response

**Status**: `200 OK`

```json
{
  "fare": "215.40"
}
```

> The fare is dynamically calculated using OpenRouteService APIs with custom per-km and per-minute rates based on vehicle type.

---

## ❌ Error Responses

| Status | Message                               |
|--------|----------------------------------------|
| 400    | Validation errors on query params     |
| 500    | Internal server error or API failure  |

---

## ⚙️ Fare Calculation Logic

Uses `mapsService` to:
1. Convert addresses to coordinates
2. Get distance (km) and duration (minutes) using OpenRouteService
3. Apply rate based on vehicle type

| Vehicle Type | Rate per KM | Rate per Min |
|--------------|-------------|--------------|
| `auto`       | 5           | 0.5          |
| `moto`       | 4           | 0.4          |
| `car`        | 10          | 1.0          |

**Formula:**
```ts
fare = (distanceInKm * ratePerKm) + (durationInMin * ratePerMin)
```

---

## 🔄 Sample Calculation

```json
{
  "distance": "12.3 km",
  "duration": "22.5 mins",
  "vehicleType": "moto"
}
```

```
fare = (12.3 * 4) + (22.5 * 0.4) = 49.2 + 9.0 = 58.2
```

---

## 🌐 External Dependencies

- [OpenRouteService](https://openrouteservice.org/)
- [Nominatim API](https://nominatim.org/) for geocoding

---

**Built With ❤️** for your Uber Clone App  
**Maintainer**: MD Rabbi
