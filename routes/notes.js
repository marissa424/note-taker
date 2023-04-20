const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for new note
notes.post('/', (req, res) => {
    if (req.body) {
        let newNote = new notes(uuidv4(), req.body.title, req.body.text);

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully 🚀');
    } else {
        res.errored('Error in adding the note');
    }
});

// POST Route for a error logging
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    if (noteId) {
        readAndDelete(noteId, './db/db.json');
        res.json('Note deleted successfully 🚀');
    } else {
        res.errored('Error in deleting the note');
    }
});

module.exports = notes; 