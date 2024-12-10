import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRouter from './routes/userRouter.js';
import { connection } from './db/postgres.js';  

// ES Module solution to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize dotenv to load environment variables
dotenv.config();

// Create an Express application instance
const app = express();

// Middleware setup
app.use(express.json()); // For parsing application/json
app.use(cors());          // For enabling CORS (Cross-Origin Resource Sharing)
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded data

// Set the views folder and EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views folder path
app.set('view engine', 'ejs');                   // Set EJS as the template engine

// Serve static files from the "static" directory
app.use('/static', express.static('static'));

// Use the user routes for handling user-related requests
app.use('/', userRouter); // All routes for user will be handled here

// Define the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Function to start the server and establish a database connection
const startServer = async () => {
  try {
    // Ensure the database connection is successful
    await connection(); 
    // Start the Express server and listen on the specified port
    app.listen(PORT, () => {
      console.warn(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error Running Server:", error);
    process.exit(1); // Exit the process if there's an error
  }
};

// Start the server
startServer();
