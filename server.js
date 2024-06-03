// Import necessary modules
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {router as rootRouter } from './routes/root.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); // Workaround to get the __dirname in ES modules

const app = express(); // Create an express app
const PORT = process.env.PORT || 3500; // Define a port, use either the value in the env file or the default port

app.use('/', express.static(`${__dirname}/public`)); // Serve static file from the public directory
                                                    // Any req to the root URL will look for files here
app.use('/', rootRouter); // Use the 'rootRouter' for handling routes

app.all('*', (req, res) => { // Catch-all route to give a 404 error if there is no other route
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
});

app.listen(PORT, () => { // Starts server and listens on the specified port
    console.log(`Server running on port ${PORT}`)
});