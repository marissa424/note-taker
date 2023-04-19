const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog.js');
const api = require('./routes/index.js');

const PORT = process.env.part || 3001;

const app = express();

// Import custom middleware "clog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ exteded: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
console.log('App listening at http://localhost:${PORT} 🚀')
);