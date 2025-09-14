
// MongoDB Note model using Mongoose
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

// Get all notes
async function getAllNotes() {
    return await Note.find().sort({ createdAt: -1 });
}

// Get note by ID
async function getNoteById(id) {
    return await Note.findById(id);
}

// Create a new note
async function createNote(title, content) {
    const note = new Note({ title, content });
    return await note.save();
}

// Update a note
async function updateNote(id, title, content) {
    return await Note.findByIdAndUpdate(id, { title, content }, { new: true });
}

// Delete a note
async function deleteNote(id) {
    return await Note.findByIdAndDelete(id);
}

export {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    Note
};
