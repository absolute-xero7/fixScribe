import jwt from "jsonwebtoken";

// Middleware function to verify JWT
const verifyJWT = (req, res, next) => {
    // Get the Authorization header from the request
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if the header is missing or doesn't start with 'Bearer '
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token using the JWT library
    jwt.verify(
        token,  // Token to verify
        process.env.ACCESS_TOKEN_SECRET,  // Secret key used to sign the token
        (err, decoded) => {  // Callback function with decoded token payload
            if (err) return res.status(403).json({ message: 'Forbidden' });

            // If the token is valid, add decoded user information to the request object
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;

            // Continue with the next middleware or route handler
            next();
        }
    );
};

// Export the middleware function
export default verifyJWT;