# API Store Backend — Server

This directory contains the backend API for the API Store project.

## Responsibilities

- User authentication and authorization (JWT-based)
- API and endpoint management
- Secure cookie handling
- OAuth integration (GitHub)
- Middleware handling and validation

The backend is built using Node.js, Express.js, and MongoDB.

---

## Folder Structure

```
server/
│
├── src/
│   ├── config/            # Database and application configuration
│   ├── controllers/       # Business logic and request handlers
│   ├── middlewares/       # Authentication and error handling
│   ├── models/            # Mongoose models (User, API, Endpoint)
│   ├── routes/            # API route definitions
│   ├── utils/             # Helper and utility functions
│   ├── app.js             # Express app configuration
│   └── server.js          # Application entry point
│
├── .env                   # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JSON Web Token (JWT)

---

## Installation and Setup

### 1. Navigate to server

```bash
cd server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_REDIRECT_URI=http://localhost:3000/api/v1/auth/github/callback
CLIENT_URL=http://localhost:5173
```

---

### 4. Run server

#### Development

```bash
npm run dev
```

#### Production

```bash
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## API Base URL

```
/api/v1
```

---

## Authentication API

Base Route:

```
/api/v1/auth
```

---

## 1. Register User

### Endpoint

```
POST /api/v1/auth/register
```

### Description

Creates a new user account and sets JWT cookie.

### Request Body

```json
{
  "name": "Jay Rathore",
  "email": "jay@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "Jay Rathore",
    "email": "jay@example.com",
    "avatar": null
  }
}
```

### Error Responses

```json
{
  "success": false,
  "message": "All fields are required"
}
```

```json
{
  "success": false,
  "message": "User already exists"
}
```

---

## 2. Login User

### Endpoint

```
POST /api/v1/auth/login
```

### Description

Authenticates user and sets JWT cookie.

### Request Body

```json
{
  "email": "jay@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Logged in successfully",
  "user": {
    "id": "user_id",
    "name": "Jay Rathore",
    "email": "jay@example.com",
    "avatar": null
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 3. Logout User

### Endpoint

```
GET /api/v1/auth/logout
```

### Description

Clears authentication cookie.

### Success Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 4. GitHub Login

### Endpoint

```
GET /api/v1/auth/github
```

### Description

Redirects user to GitHub OAuth login.

---

## 5. GitHub Callback

### Endpoint

```
GET /api/v1/auth/github/callback
```

### Description

Handles GitHub OAuth response, creates or logs in the user, and redirects to frontend.

### Flow

1. User logs in via GitHub  
2. GitHub returns code  
3. Server exchanges code for access token  
4. Fetches user profile  
5. Creates or logs in user  
6. Sets JWT cookie  
7. Redirects to dashboard  

---

## 6. Get Current User Profile

### Endpoint

```
GET /api/v1/users/profile
```

### Auth Required

Yes (JWT)

### Description

Returns logged-in user details.

### Success Response

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "Jay Rathore",
    "email": "jay@example.com",
    "avatar": "image_url"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "User not found"
}
```

---

## Authentication Details

- JWT stored in HTTP-only cookies  
- Cookie expiry: 7 days  
- Secure in production  
- SameSite: lax (development) / none (production)

---

## Notes

- Passwords are hashed using bcrypt  
- OAuth supported via GitHub  
- Tokens generated using JWT  
- Clean MVC architecture used  

---

# API Management

Base Route:

```
/api/v1/apis
```

---

## 1. Create API

### Endpoint

```
POST /api/v1/apis
```

### Auth Required

Yes (JWT)

### Description

Creates a new API entry. The logged-in user is set as the author.

### Request Body

```json
{
  "title": "Weather API",
  "description": "Provides weather data",
  "baseUrl": "https://api.weather.com",
  "category": "Weather"
}
```

### Success Response

```json
{
  "success": true,
  "message": "API created successfully",
  "data": {
    "_id": "api_id",
    "title": "Weather API",
    "description": "Provides weather data",
    "baseUrl": "https://api.weather.com",
    "category": "Weather",
    "author": "user_id"
  }
}
```

---

## 2. Get All APIs

### Endpoint

```
GET /api/v1/apis
```

### Auth Required

No

### Description

Fetches all available APIs with author details.

### Success Response

```json
{
  "success": true,
  "message": "APIs fetched successfully",
  "data": [
    {
      "_id": "api_id",
      "title": "Weather API",
      "description": "Provides weather data",
      "baseUrl": "https://api.weather.com",
      "category": "Weather",
      "author": {
        "_id": "user_id",
        "name": "Jay Rathore",
        "email": "jay@example.com"
      }
    }
  ]
}
```

---

## 3. Get API By ID

### Endpoint

```
GET /api/v1/apis/:id
```

### Auth Required

No

### Description

Fetches a single API by its ID.

### Success Response

```json
{
  "success": true,
  "message": "API fetched successfully",
  "data": {
    "_id": "api_id",
    "title": "Weather API",
    "description": "Provides weather data",
    "baseUrl": "https://api.weather.com",
    "category": "Weather",
    "author": {
      "_id": "user_id",
      "name": "Jay Rathore",
      "email": "jay@example.com"
    }
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "API not found"
}
```

---

## 4. Update API

### Endpoint

```
PUT /api/v1/apis/:id
```

### Auth Required

Yes (JWT)

### Description

Updates an existing API. Only the API owner can update it.

### Request Body

```json
{
  "title": "Updated API Name",
  "description": "Updated description"
}
```

### Success Response

```json
{
  "success": true,
  "message": "API updated successfully",
  "data": {
    "_id": "api_id",
    "title": "Updated API Name",
    "description": "Updated description"
  }
}
```

### Error Responses

```json
{
  "success": false,
  "message": "API not found"
}
```

```json
{
  "success": false,
  "message": "Not authorized"
}
```

---

## 5. Delete API

### Endpoint

```
DELETE /api/v1/apis/:id
```

### Auth Required

Yes (JWT)

### Description

Deletes an API. Only the API owner can delete it.

### Success Response

```json
{
  "success": true,
  "message": "API deleted successfully"
}
```

### Error Responses

```json
{
  "success": false,
  "message": "API not found"
}
```

```json
{
  "success": false,
  "message": "Not authorized"
}
```

---

# Endpoint Management

Base Route:

```
/api/v1/endpoints
```

---

## 1. Create Endpoint

### Endpoint

```
POST /api/v1/endpoints
```

### Auth Required

Yes (JWT)

### Description

Creates a new endpoint under a specific API. Only the API owner can create endpoints.

### Request Body

```json
{
  "apiId": "api_id",
  "method": "GET",
  "path": "/weather",
  "description": "Get weather data",
  "requestBody": {},
  "responseExample": {
    "temperature": "25°C",
    "condition": "Sunny"
  }
}
```

### Success Response

```json
{
  "success": true,
  "message": "Endpoint created successfully",
  "data": {
    "_id": "endpoint_id",
    "apiId": "api_id",
    "method": "GET",
    "path": "/weather",
    "description": "Get weather data",
    "requestBody": {},
    "responseExample": {
      "temperature": "25°C",
      "condition": "Sunny"
    }
  }
}
```

### Error Responses

```json
{
  "success": false,
  "message": "API not found"
}
```

```json
{
  "success": false,
  "message": "Not authorized"
}
```

---

## 2. Get Endpoints By API

### Endpoint

```
GET /api/v1/endpoints/api/:apiId
```

### Auth Required

No

### Description

Fetches all endpoints belonging to a specific API.

### Success Response

```json
{
  "success": true,
  "message": "Endpoints fetched successfully",
  "data": [
    {
      "_id": "endpoint_id",
      "apiId": "api_id",
      "method": "GET",
      "path": "/weather",
      "description": "Get weather data"
    }
  ]
}
```

---

## 3. Get Endpoint By ID

### Endpoint

```
GET /api/v1/endpoints/:id
```

### Auth Required

No

### Description

Fetches a single endpoint by its ID.

### Success Response

```json
{
  "success": true,
  "message": "Endpoint fetched successfully",
  "data": {
    "_id": "endpoint_id",
    "apiId": "api_id",
    "method": "GET",
    "path": "/weather",
    "description": "Get weather data",
    "requestBody": {},
    "responseExample": {}
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Endpoint not found"
}
```

---

## 4. Update Endpoint

### Endpoint

```
PUT /api/v1/endpoints/:id
```

### Auth Required

Yes (JWT)

### Description

Updates an endpoint. Only the API owner can update it.

### Request Body

```json
{
  "description": "Updated description",
  "method": "POST"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Endpoint updated successfully",
  "data": {
    "_id": "endpoint_id",
    "description": "Updated description",
    "method": "POST"
  }
}
```

### Error Responses

```json
{
  "success": false,
  "message": "Endpoint not found"
}
```

```json
{
  "success": false,
  "message": "Not authorized"
}
```

---

## 5. Delete Endpoint

### Endpoint

```
DELETE /api/v1/endpoints/:id
```

### Auth Required

Yes (JWT)

### Description

Deletes an endpoint. Only the API owner can delete it.

### Success Response

```json
{
  "success": true,
  "message": "Endpoint deleted successfully"
}
```

### Error Responses

```json
{
  "success": false,
  "message": "Endpoint not found"
}
```

```json
{
  "success": false,
  "message": "Not authorized"
}
```

---

