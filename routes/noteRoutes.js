// Import necessary modules
import express from "express";
import * as notesController from '../controllers/notesController.js';

// Create an instance of Express Router
const router = express.Router();

router.route('/') // we are at /notes
    .get(notesController.getAllNotes) // READ
    .post(notesController.createNewNote) // CREATE
    .patch(notesController.updateNote) // UPDATE
    .delete(notesController.deleteNote) // DELETE

// Export the router instance
export { router };