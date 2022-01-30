const express = require('express');
const router = express.Router();
// importing the db.json which should contain the notes, stored it in notes variable that we are going to use later
const notes = require("../db/db.json");
// importing the uuid module - unique ID
const uuid = require("../helpers/uuid");
// fs module
const fs = require("fs");

// get request to api/notes
router.get("/notes", (req, res) => {
  res.json(notes);
});

// post request
router.post("/notes", (req, res) => {
  // deconstructing the title and text as req.body
  const { title, text } = req.body;
  console.log(title, text);
  console.log(req.body);
  // If title and text are true, declare newNote var which has values of the title, text, and id using the uuid module from node
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    // newNote will be pushed inside the notes which is the db.json file, body now becomes the newNote
    notes.push(newNote);
    const response = {
      status: "success",
      body: newNote,
    };
    // using the fs module from node, we use the writeFileSync method with path and JSON stringify passing notes arg to update notes array(db.json)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    console.log(response);
    res.json(response);
  } else {
    res.json("error in posting the note");
  }
});

// delete request
router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  // looping throught the notes array
  for (let i = 0; i < notes.length; i++) {
    // if the id being deleted matches the req.params.id
    if (notes[i].id === id) {
      // deleteCount 1, starting at the index, splice(start, deleteCount)
      notes.splice(i, 1);
    }
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

module.exports = router;