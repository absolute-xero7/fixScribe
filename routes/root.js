// Import necessary modules
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Create an instance of Express Router
const router = express.Router();

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define a route to handle requests to the root URL (/) or /index or /index.html
router.get('^/$|/index(.html)?', (req, res) => { // Send the index.html file located in the views directory
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
});

// Export the router instance
export { router };