const mongoose = require('mongoose');

const ArtistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type : String, required:true},
    genre: {type : String, required:true},
    state: {type : String, required:true},
    user: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Artist', ArtistSchema);