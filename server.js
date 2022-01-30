// ** modules ** //
// express module
const express = require("express");
// node.js module to deal with filepaths
const path = require("path");
// init express
const app = express();
// importing the logger middleware
const logger = require("./middleware/logger");
// importing the routes to the api
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3000; // looking for environment variables, called PORT or if not available, 3000

//init middleware
app.use(logger);
app.use(express.urlencoded({ extended: true })); // It parses incoming requests with urlencoded payloads
app.use(express.json()); // It parses incoming requests

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// initializing the routes
app.use("/api", apiRoutes);

// route to homepage
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname), "./public/index.html")
})

// route to the notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
