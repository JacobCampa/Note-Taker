const express = require('express');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve 'public' folder statically
app.use(express.static(path.join(__dirname, 'public')));

// Use the 'notes' routes for API endpoints
app.use('/api/notes', notesRoutes);

// Handle direct access to /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });

// If a request doesn't match any static file or API route, serve the 'index.html'
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});