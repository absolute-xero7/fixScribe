// Import necessary modules
import 'dotenv/config';
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
// Middleware Imports
import { logger, logEvents } from './middleware/logger.js'
import { errorHandler } from './middleware/errorHandler.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions } from "./config/corsOptions.js";
// Router Imports
import { router as rootRouter } from './routes/root.js';
import { router as userRoutes } from './routes/userRoutes.js';
import { router as noteRoutes } from './routes/noteRoutes.js';

import { connectDB } from './config/dbConn.js';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); // Workaround to get the __dirname in ES modules

// Create an express app
const app = express();

// Define the port
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB()

// Middleware
app.use(logger); // Use the logger middlewarezz
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON data  
app.use(cookieParser()); // Middleware to parse cookies from the HTTP request

// Serve static file from the 'public' directory
app.use('/', express.static(`${__dirname}/public`)); // Any request to the root URL will look for files in this dir

// Route Handling
app.use('/', rootRouter);
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

// Catch-all route to give a 404 error if there is no other route
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(`${__dirname}/views/404.html`);
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found');
    }
});

// Use the errorHandler middleware for handling errors
app.use(errorHandler); // Placed at the end to catch any errors that occur in the preceding middleware or route handlers

mongoose.connection.once('open', () => {
    // Starts server and listens on the specified port
    app.listen(PORT, () => { 
        console.log('Connected to MongoDB');
        console.log(`Server running on port ${PORT}`);
    });
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
});


