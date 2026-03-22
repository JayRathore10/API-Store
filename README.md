# API-Store Project

A full-stack application with a React frontend and Node/Express backend.

## Local Development (with Docker)

To run the entire stack (Frontend, Backend, and MongoDB) locally using Docker:

1. **Prerequisites**: Ensure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.
2. **Setup Credentials**: Make sure you have configured your environment variables in `server/.env`.
3. **Launch the Application**:
   ```bash
   docker-compose up --build
   ```
4. **Access the Services**:
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3000

## Environment Variables (.env)

The server requires a `.env` file in the `server/` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/API-Store (Replaced by 'mongodb' in Docker)
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
PORT=3000

# GitHub OAuth
GITHUB_CLIENT_ID=your_id
GITHUB_CLIENT_SECRET=your_secret
GITHUB_REDIRECT_URI=http://localhost:3000/api/v1/users/github/callback

# Client URL
CLIENT_URL=http://localhost:5173
```

## Features
- Complete Authentication (Register/Login with JWT)
- GitHub Social Auth integration
- Automated database connection
- Hot reloading for both frontend and backend in Docker
