const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
    path:{
        type:String,
        required:true
    },
    owner: {
        type:String,
        required:true
    }
},{timestamps:true})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema )

module.exports = { Bookmark }