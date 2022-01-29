// modules //
const express = require('express');
// node.js module to deal with filepaths
const path = require('path'); 
// init express
const app = express();
const PORT = process.env.PORT || 3000; // looking for environment variables, called PORT or if not available, 3000

const notes = [
    {
        title: "test title",
        text: "test text"
    }
];


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