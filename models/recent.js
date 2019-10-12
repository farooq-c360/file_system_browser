const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    path:{
        type:String,
        required:true
    },
    accessCount:{
        type:Number,
        required:true,
        default: 0
    },
    lastTimeAccessed:{
        type:Date,
        default: new Date()
    },
    owner: {
        type:String,
        required:true
    }
},{timestamps:true})

const Recent = mongoose.model('Recent', historySchema )

module.exports = { Recent }