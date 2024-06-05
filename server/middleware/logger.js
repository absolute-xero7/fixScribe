// Import necessary modules
import { format } from 'date-fns'; // Date formatting library
import { v4 as uuid } from 'uuid'; // UUID generation library
import fs from 'fs'; // File system module for synchronous operations
import fsPromises from 'fs/promises'; // File system module for asynchronous operations
import { fileURLToPath } from "url";
import { dirname } from "path";

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to log events to a file
const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss'); // Format current date and time
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`; // Create log entry with date, UUID, and message

    try {
        // Check if logs directory exists, create if it doesn't
        if (!fs.existsSync(`${__dirname}/../logs`)) {
            await fssPromises.mkdir(`${__dirname}/../logs`);
        }
        // Append log entry to specified log file
        await fsPromises.appendFile(`${__dirname}/../logs/${logFileName}`, logItem);
    } catch (err) {
        console.log(err); // Log any errors that occur during logging
    }
    
};

// Middleware function to log requests
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log'); // Log request method, URL, and origin
    console.log(`${req.method} ${req.path}`); // Log request method and path to console
    next(); // Continue to the next middleware or route handler
};

// Export the logEvents function and logger middleware for use in other modules
export { logEvents, logger };