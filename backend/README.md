### 📦 POST /users/register
Registers a new user and returns an authentication token along with the user data.

### ✅ Description
This endpoint allows users to register by providing their full name, email, and password. The password is securely hashed and stored in the database. On success, it returns a JWT token and user details (excluding the password).


### 📥 Request Body
Send a JSON object with the following structure:
    { <br>
    "fullname": { <br>
        "firstname": "John", <br>
        "lastname": "Doe" <br>
    },
    "email": "john@example.com", <br>
    "password": "secret123" <br>
    } <br>

### 📌 Field Requirements
    Field	            Type	  Required	        Validation
    fullname.firstname	string	✅ Yes	Minimum 3 characters
    fullname.lastname	string	✅ Yes	Minimum 3 characters (optional in logic)
    email	string	✅ Yes	Must be a valid email format
    password	string	✅ Yes	Minimum 6 characters

### 📤 Response
- ✅ 201 Created

{
  "token": "jwt_token_here", <br>
  "user": {<br>
    "_id": "user_id",<br>
    "fullname": {<br>
      "firstname": "John",<br>
      "lastname": "Doe"<br>
    },<br>
    "email": "john@example.com"<br>
  }<br>
}


### 🔐 Authorization
No token is required to access this route.

## 🧪 Notes
 - Passwords are hashed using bcrypt before being stored.

 - A JWT token is generated using jsonwebtoken with the user's ID and a secret key (process.env.JWT_SECRET).

 - The password field is excluded from the user response by default (select: false in the schema).