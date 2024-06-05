// Import necessary modules
import { logEvents } from './logger.js'; // Import the logEvents function from the logger module

// Error handling middleware function
const errorHandler = (err, req, res, next) => {
    // Log the error details using the logEvents function
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    
    // Log the error stack trace to the console for debugging
    console.log(err.stack);

    // Determine the response status code; default to 500 (server error) if not set
    const status = res.statusCode ? res.statusCode : 500;

    // Set the response status code
    res.status(status);

    // Send a JSON response with the error message and a flag indicating it's an error
    res.json({ message: err.message, isError: true });
};

// Export the errorHandler function for use in other modules
export { errorHandler };