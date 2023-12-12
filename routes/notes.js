const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db', 'db.json');

let notes = [];

try {
  const data = fs.readFileSync(dbPath, 'utf-8');
  notes = JSON.parse(data);
} catch (error) {
  console.error('Error reading db.json:', error);
}

function saveNotes() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to db.json:', error);
  }
}

// Routes
router.get('/', (req, res) => {
  res.json(notes);
});

router.post('/', (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  saveNotes();
  res.json(newNote);
});

router.put('/:id', (req, res) => {
  const noteId = req.params.id;
  const updatedNote = req.body;

  const index = notes.findIndex((note) => note.id === parseInt(noteId));
  if (index !== -1) {
    notes[index] = updatedNote;
    saveNotes();
  }

  res.json(updatedNote);
});

router.delete('/:id', (req, res) => {
  const noteId = req.params.id;

  notes = notes.filter((note) => note.id !== parseInt(noteId));
  saveNotes();

  res.send('Note deleted successfully');
});

module.exports = router;