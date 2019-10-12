const { Bookmark } = require('../models/bookmark');

exports.list = function(req, res) {
    owner = req.params.owner;
    console.log(owner);

    Bookmark.find({owner: owner}).sort({createdAt : 'desc'}).exec((err, doc) => {
        if (err) { res.json({ status: 400, message: err }) }

        res.send(doc);
    })
}

exports.add = function(req, res) {
    //TODO messy code
    console.log("updating bookmark ", req.body.folder);

    const bookmark = new Bookmark({
        path: req.body.folder,
        owner: req.body.user,
    });

    bookmark.save((err, doc) => {
        if (err) { res.json({ status: 400, message: err }) }
    });
}

exports.isBookmarked = function (folder) {
    return Bookmark.find({path: folder}).exec();
}