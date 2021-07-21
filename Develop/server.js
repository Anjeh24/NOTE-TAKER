//Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');

//Setting up the Express App

const app = express();
const PORT = process.env || 3000;

// Setting up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));

//File routes
require('./routes/routes')(app);


//Setting up routes that sends the user first to AJAX page

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));




app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

//Should display api notes get route

app.get('/api/notes', (req, res) => res.json(notes));

//API post routes. Should post new notes

app.post('/api/notes', (req, res) => {
    const newNotes = req.body;
  
    console.log(newNotes);
  
    notes.push(newNotes);
  
    res.json(newNotes);

    upgradeDb();

    return console.log("Added" + newNotes.title);
  });

  //To delete an entry / specifis note

  app.delete("/api/notes/", => (req, res) {
    notes.splice(req.params)
    upgradeDb();
    console.log("Deleted"+req.params.id);
  });

//Should keep the json file up to date whenever a note is added or deleted (That is what I am tryin to do here.)

const upgradeDb = (filePath, res) => {
    return fs.writeFile(`${__dirname}${filePath}`, (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  };

//Starts server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

