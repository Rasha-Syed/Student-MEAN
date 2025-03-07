# MEAN Student Project

This is a full-stack MEAN (MongoDB, Express, Angular, Node.js) project for managing student records. 

## Project Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: [Install Node.js](https://nodejs.org/)
- **npm (Node Package Manager)**: This comes with Node.js by default.
- **MongoDB** (locally or remotely): [Install MongoDB](https://www.mongodb.com/try/download/community) or use a hosted MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Project Structure

- **Frontend**: Angular app located in the `frontend` directory.
- **Backend**: Express and Node.js server located in the `backend` directory.

## Running the Project

### Step 1: Install Dependencies

1. **Install backend dependencies**:
    Navigate to the `backend` folder and run the following command:
    ```bash
    cd backend
    npm install
    ```

2. **Install frontend dependencies**:
    Navigate to the `frontend` folder and run the following command:
    ```bash
    cd frontend
    npm install
    ```

### Step 2: Running the Backend

1. **Start the backend server using `nodemon`**:
   Navigate to the `backend` folder and run the following command to start the server:
   ```bash
   cd backend
   nodemon server.js


### Step 3: Running the Frontend

1. **Start the frontend `angular`**:
   Navigate to the `frontend` folder and run the following command:
   ```bash
   cd frontend
   npm start
