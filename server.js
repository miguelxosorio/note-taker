// modules //
const express = require("express");
// node.js module to deal with filepaths
const path = require("path");
// init express
const app = express();
// importing the db.json which should contain the notes, stored it in notes variable that we are going to use later
const notes = require("./db/db.json");
// importing the logger middleware
const logger = require("./middleware/logger");
// importing the uuid module - unique ID
const uuid = require("./helpers/uuid");
// fs module
const fs = require("fs");

const PORT = process.env.PORT || 3000; // looking for environment variables, called PORT or if not available, 3000

//init middleware
app.use(logger);
app.use(express.urlencoded({ extended: true })); // It parses incoming requests with urlencoded payloads
app.use(express.json()); // It parses incoming requests

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// route to homepage
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname), "./public/index.html")
})

// get request to api/notes
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// route to the notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// post request
app.post("/api/notes", (req, res) => {
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
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes.splice(i, 1);
    }
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
