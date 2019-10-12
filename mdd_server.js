const express = require('express');
var app = express();
const fsb = require('./routes/files_system_browser');
const recent = require('./routes/recent');
const bookmark = require('./routes/bookmark');
const user = require('./routes/user');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
var cors = require('cors');

//const program = require('program');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

var whitelist = ['http://localhost:3000', 'http://example2.com'];
var corsOptions = {
  origin: function (origin, callback) {
    console.log('origin');
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

module.exports = app;
module.exports = corsOptions;

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var cDir =  process.cwd();
app.use(express.static(cDir)); //current working directory
app.use(express.static(__dirname)); //module directory

//Browser
app.get('/files/:dir', cors(corsOptions), fsb.list);
app.post('/files/add', cors(corsOptions), fsb.createFolder);

//Recent
app.get('/recent/:user/:type', cors(corsOptions), recent.list);

//User
app.get('/bookmark/:owner', cors(corsOptions), bookmark.list);
app.post('/bookmark/add', cors(corsOptions), bookmark.add);

//User
app.get('/user/:id', cors(corsOptions), user.list);
app.post('/user/add', cors(corsOptions), user.add);

if (!module.parent) {
  app.listen(2000, () => console.log(`Example app listening on port ${2000}!`));
}