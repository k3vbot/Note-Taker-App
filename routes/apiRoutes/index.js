const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();

fs.readFile('db/db.json','utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    
    router.get('/', (req, res) => {
        res.json(notes);
    });

    router.post('/', (req, res) => {
        let newNote = {
            title:req.body.title,
            text: req.body.text,
            id: uuidv4(),
        }
        notes.push(newNote);
        updateDb();
        return window.location.reload();
    });

    router.get('/api/notes', (req, res) => {
        res.json(notes[req.params.id]);
    });


    function updateDb() {
        fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
        });
    }
});

module.exports=router;