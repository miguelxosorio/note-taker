# Note Taker Starter Code

## Problems
1. when i open the note taker
    - then I am presented with a landing page with a link to a notes page

2. when i click on the link to the notes page
    - then i am presented with a page with existing notes listed in the left hand column
    - plus empty fields to enter a new note title and the note's text in the right hand column

3. when i enter a new note title and the note's text
    - then a save icon appears in the navigation at the top of the page

4. when i click on the save icon
    - then the new note i have entered is saved and appears in the left hand column with other existing notes

5. when i click on an existing note in the list in the left-hand column
    - then that note appears in the right hand column

6. when i click on the write icon in the navigation at the top of the page
    - then i am presented with empty fields to enter a new note title and the note's text in the right hand column

We need:
1. fs module - `done` 

2. html routes
    - GET /notes 
        - should return notes.html file
    
    - GET * 
        - should return the index.html file

3. api routes
    - GET /api/notes 
        - should read the db.json file 
        - and return all saved notes as JSON
    
    - POST /api/notes 
        - should receive a new note to save on the request body
        - add it to the db.json file
        - return the new note to the client
        - give each note a unique id
            - installed uuid - `done`

4. (BONUS) DELETE notes
    - DELETE /api/notes/:id
        - should receive a query parameter containing the id of a note to delete
        - in order to delete a note
            - need to read all notes from db.json file `fs.readFile()`??
            - remove the note with the give id property
            - rewrite the notes to the db.json file `fs.writeFile()`??