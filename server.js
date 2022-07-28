const express = require('express');
const fs = require('fs');
const path = require('path');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname));
app.use(routes);

app.listen(PORT, () => 
    console.log(`Listening on port ${PORT}!`)
);