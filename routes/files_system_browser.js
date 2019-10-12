const fs = require('fs');
const path = require('path');
const _ = require('underscore');
var mkdirp = require('mkdirp');
var recent = require('./recent');
var bookmark = require('./bookmark');

exports.list = function(req, res) {
    var currentDir =  (req.params.dir === undefined) ? '/' : req.params.dir;
    fs.readdir(currentDir, function (err, files) {
        if (err) { throw err; }
         var data = [];
         files.forEach(function (file) {
           try {
              var isDirectory = fs.statSync(path.join(currentDir,file)).isDirectory();
              var stats = fs.statSync(path.join(currentDir,file));

              if (isDirectory) {
                data.push(
                { 
                  Name : file, IsDirectory: true, 
                  Path : path.join(currentDir, file), LastChanged: stats.mtime, Size: 0
                });
              } else {
                data.push({ Name : file, Ext : path.extname(file), IsDirectory: false, 
                Path : path.join(currentDir, file), LastChanged: stats.mtime, Size: Math.round(stats.size / 1000.0)});
              }
           } catch(e) {
             console.log(e); 
           }        
         });

        //updating folder stats
        recent.add(req, res); 

        //checking if folder has been marked
        var isBookMarkPromise = () => {
          return new Promise((resolve, reject) => {
            bookmark.isBookmarked(currentDir).then(function(data) {
              err = null;
              err 
                 ? reject(err) 
                 : resolve(data);
            });
          });
        };

        var callIsBookMarkPromise = async () => {
          var result = await (isBookMarkPromise());
          return result;
        };

        callIsBookMarkPromise().then(function(result) {
          res.json({
            files: data,
            isBookmarked: result.length > 0
          });
       });
     });
}

exports.createFolder = function(req, res) {
  var dir = req.body.folder;
  var parent = req.body.parentFolder;

  console.log(parent+dir);
  mkdirp(parent+'/'+dir, function(err) { 
    if (err) {
      res.json({
        status: 400,
        message: err
      })
    }
  });

  res.json({
    status: 200,
    Message: "Success"
  });
}