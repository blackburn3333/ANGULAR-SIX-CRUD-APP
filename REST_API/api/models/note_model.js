const mongoose = require('mongoose');

const note_schema = mongoose.Schema({
    note_title: String,
    note_description: String,
    
});

module.exports = mongoose.model('Note', note_schema);