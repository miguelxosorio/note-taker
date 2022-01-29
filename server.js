// modules //
const express = require('express');
// node.js module to deal with filepaths
const path = require('path'); 
// init express
const app = express();
// importing the db.json which should contain the notes
const notes = require('./db/db.json');
// importing the logger middleware
const logger = require('./middleware/logger');
// importing the uuid module - unique ID
const uuid = require('./helpers/uuid');
// fs module
const fs = require('fs');


const PORT = process.env.PORT || 3000; // looking for environment variables, called PORT or if not available, 3000

//init middleware
app.use(logger);
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // It parses incoming requests with urlencoded payloads
app.use(express.json()); // It parses incoming requests

// get request
app.get('/api/notes', (req, res) => {
   res.json(notes);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// post request
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    console.log(title, text);
    console.log(req.body);
    if(title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        notes.push(newNote)
        const response = {
            status: 'success',
            body: newNote        
        };
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        console.log(response);
        res.json(response)
    } else {
        res.json('error in posting the note');
    }
});

// delete request
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    for (let i = 0; i < notes.length; i++) {
        if(notes[i].id === id) {
            notes.splice(i, 1)
        }
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});

// listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});