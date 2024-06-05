import User from '../models/User.js';
import Note from '../models/Note.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Fetch all user documents from the User collection, excluding the password field
    const users = await User.find().select('-password').lean();
    // If no users are found, send a 400 status response
    if (!users) {
        return res.status(400).json({ message: 'No users found' })
    };
    // If users are found, send them back in the response as JSON
    res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    // Extract username, password, and roles from the request body
    const { username, password, roles } = req.body

    // Confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    };

    // Check for duplicate username in the database
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec();

    // If a duplicate username is found, send a 409 conflict status
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    };

    // Hash the password using bcrypt with 10 salt rounds
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds
    
    // Create a user object with the provided data and hashed password
    const userObject = { username, password: hashedPwd, roles };

    // Create and store the new user in the database
    const user = await User.create(userObject);

    // If the user is successfully created, send a 201 status with a success message
    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        // If user creation fails, send a 400 status with an error message
        res.status(400).json({ message: 'Invalid user data received' })
    }
});

// @desc Update user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Update user fields
    user.username = username
    user.roles = roles
    user.active = active

    // Update password if provided
    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    // Save the updated user to the database
    const updatedUser = await user.save()

    // Success message
    res.json({ message: `${updatedUser.username} updated` })
});

// @desc Delete user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {

});

export { 
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
 };