
## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (Make sure it's installed and running)

## Project Structure

- `frontend/`: React frontend application
- `server/`: Node.js/Express backend application

## Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install express mongoose cors multer body-parser
   ```

3. Start the server:
   ```
   node index.js
   ```
   OR
   npm run start
   ```
   if you add this in package.json
   "scripts": {
    "start": "nodemon index.js"
  }
   The server will run on `http://localhost:3001`.

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install react react-dom react-router-dom axios bootstrap
   ```
   npm install react-scripts
   ```

3. Start the React application:
   ```
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Dependencies

### Backend Dependencies
- Express: `npm install express`
- Mongoose: `npm install mongoose`
- CORS: `npm install cors`
- Multer: `npm install multer`

### Frontend Dependencies
- React: (Included in create-react-app)
- React Router DOM: `npm install react-router-dom`
- Axios: `npm install axios`
- Bootstrap: `npm install bootstrap`

## Running the Application

1. Start MongoDB on your local machine.
2. Run the backend server (from the `server` directory):
   ```
   node index.js
   ```
3. In a separate terminal, run the frontend (from the `frontend` directory):
   ```
   npm start
   ```

## Features

- View list of users
- Create new users with name, age, and profile image
- Update existing users
- Delete users

## Notes

- Ensure MongoDB is running before starting the backend server.
- The backend uses the `uploads` directory to store user images.
- The frontend is configured to communicate with the backend at `http://localhost:3001`.
