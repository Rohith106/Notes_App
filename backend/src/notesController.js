
import mongoose from "mongoose";
import { getAllNotes as getAllNotesModel, getNoteById as getNoteByIdModel, createNote as createNoteModel, updateNote as updateNoteModel, deleteNote as deleteNoteModel } from "./notesModel.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await getAllNotesModel();
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await getNoteByIdModel(req.params.id);
        if (!note) return res.status(404).json({ Message: "Note not Found" });
        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteById controller", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const savedNote = await createNoteModel(title, content);
        res.status(201).json(savedNote);
    } catch (error) {
        console.log("Error in createNote controller", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await updateNoteModel(req.params.id, title, content);
        if (!updatedNote || Object.keys(updatedNote).length === 0) {
            return res.status(404).json({ Message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log("Error in updateNote controller", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}

export async function deleteNote(req, res) {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ Message: "Invalid or missing note ID" });
    }
    try {
        const deleted = await deleteNoteModel(id);
        if (!deleted) {
            return res.status(404).json({ Message: "Note not found" });
        }
        res.status(200).json({ Message: "Note deleted Successfully" });
    } catch (error) {
        console.log("Error in deleteNote controller", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}
