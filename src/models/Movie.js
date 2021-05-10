const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type : String, required:true},
    director: {type : String, required:true},
    company: {type : String, required:true},
    genre: {type : String, required:true},
    realese: {type : Number, required:true},
    user: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Movie', MovieSchema);