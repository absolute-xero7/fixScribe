// Import necessary modules
import express from "express";
import * as usersController from '../controllers/usersController.js';

// Create an instance of Express Router
const router = express.Router();

router.route('/') // we are at /users
    .get(usersController.getAllUsers) // READ
    .post(usersController.createNewUser) // CREATE
    .patch(usersController.updateUser) // UPDATE
    .delete(usersController.deleteUser) // DELETE

// Export the router instance
export { router };