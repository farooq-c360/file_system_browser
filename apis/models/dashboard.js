const mongoose = require('mongoose');
const recent = require('./recent.js.js');
const user = require('./user.js.js');

const dashboardEntry = mongoose.Schema({
    UserStorage: {
        type: Number,
        default: 0
    },
    StorageStatDate: {
        type: Date,
        default:n/a
    },
    NetworkUsage: {
        type: Number,
        default: 0,
    },
    NetworkStorageStatDate: {
        type: Date,
        default:n/a
    },
    owner: {
        type:String,
        required:true
    }
},{timestamps:true})

const homePage = mongoose.Schema({
    dashboardEntryData,
    recentPaths,
    user
},{timestamps:true})


const HomePage = mongoose.model('HomePage', homePage )
const DashboardEntry = mongoose.model('DashboardEntry', dashboardEntry )

module.exports = { HomePage, DashboardEntry }