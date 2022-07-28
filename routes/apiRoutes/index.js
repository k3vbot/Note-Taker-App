const fs = require('fs');
const router = require('express').Router();

fs.readFile('db/db.json','utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    
    router.get('/', (req, res) => {
        res.json(notes);
    });

    router.post('/', (req, res) => {
        let newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log('Added new note: '+newNote.title);
    });

    router.get('/:id', (req, res) => {
        res.json(notes[req.params.id]);
    });

    router.delete('/:id', (req, res) => {
        notes.splice(req.params.id, 1);
        updateDb();
    });

    function updateDb() {
        fs.writeFile('./db/db.json', JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
        });
    }
});

module.exports=router;