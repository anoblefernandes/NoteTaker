// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")
var uuid = require("uuid")

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
 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})


app.get('/api/notes', function(req, res){
    fs.readFile("./db/db.json","utf-8", (err, data)=>{
        if(err)throw err
        console.log(data)
        res.json(JSON.parse(data))
    })

})
app.post('/api/notes', function(req, res){
    fs.readFile("./db/db.json","utf-8", (err, data)=>{
        if(err)throw err
        var db = JSON.parse(data)
        // res.json(JSON.parse(data))
        var newnote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid.v1()
        }
        db.push(newnote)
        fs.writeFile("./db/db.json", JSON.stringify(db), (err, data) =>{
            if (err) throw err
            res.json(db)
        })
    })

})
app.delete('/api/notes/:id', function(req, res){
    fs.readFile("./db/db.json","utf-8", (err, data)=>{
        if(err)throw err
        var db = JSON.parse(data)
        var id = req.params.id
        db = db.filter(note => note.id!==id)
        fs.writeFile("./db/db.json", JSON.stringify(db), (err, data) =>{
            if (err) throw err
            res.json(db)
        })
    })

})
app.get('*',function(req, res){
 
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });