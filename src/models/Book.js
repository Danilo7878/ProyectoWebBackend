const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type : String, required:true},
    author: {type : String, required:true},
    genre: {type : String, required:true},
    year: {type : Number, required:true},
    user: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Book', BookSchema);