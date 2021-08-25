//Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');

const data = fs.readFileSync("./db/db.json", "utf-8");
const noteList = JSON.parse(data);

//creating universal unique identifier for notes (uuid)
const { v4: uuidv4 } = require('uuid');
//Setting up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Setting up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//app.use(express.static(__dirname, "Develop/public"));

//File routes for css and js to load
//this is for css
app.get("/assets/css/styles.css", (req, res) => {
  res.set("content-type", "text/css");
  res.sendFile(path.join(__dirname, "/assets/css/styles.css"));
});
//this is for js
app.get("/assets/js/index.js", (req, res) =>
  res.sendFile(path.join(__dirname, "/assets/js/index.js"))
);
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
app.get("/api/notes", (req, res) => {
    res.set("content-type", "application/json");
    res.sendFile(path.join(__dirname, "/db/db.json"));
});



///Funtion for writing notes to db
function noteWriter(notes) {
  fs.writeFile(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(notes),
    (err) => (err ? console.err(err) : console.log("note saved to db"))
  );
};
// will assign universal unique identifier to notes written
app.post("/api/notes", (req, res) => {
  const note = req.body;
  const noteID = uuidv4();
  note.id = noteID;
  noteList.push(note);
  noteWriter(noteList);
  res.send(note);
});
//delete notes upon request
app.delete("/api/notes/:uuid", (req, res) =>{
  for(let i = 0; i < noteList.length; i++){
    if (noteList[i].id === req.params.uuid){
      noteList.splice(i, 1);
    } 
  }
  noteWriter(noteList);
  res.end();
});
//listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));


//Credits; besides the beginning code, some was extracted from week11 school work and some modified with lots of gratitude from lanceB on github.