// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// This tells express to look for static files.
app.use(express.static('public'))

app.get('/notes',function(req, res){
    var notes = [
        {text: "Notes are useful", id: 1},
        {text: "Notes are fun", id: 2},
        {text: "Notes are good", id: 3},
    ]
    res.json(notes)
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });