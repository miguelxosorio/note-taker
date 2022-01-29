// modules //
const express = require('express');
// node.js module to deal with filepaths
const path = require('path'); 
// init express
const app = express();
// importing the db.json which should contain the notes
const notes = require('./Develop/db/db.json');
// importing the logger middleware
const logger = require('./middleware/logger');

const PORT = process.env.PORT || 3000; // looking for environment variables, called PORT or if not available, 3000

//init middleware
app.use(logger);

// get api notes endpoint
app.get('/api/notes', (req, res) => {
   res.json(notes);
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});