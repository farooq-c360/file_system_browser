const { Bookmark } = require('../models/bookmark');

exports.list = function(req, res) {
    owner = req.params.owner;
    Bookmark.find({owner: owner}).sort({createdAt : 'desc'}).exec((err, doc) => {
        if (err) { res.status(400).json({message: err }); return; }

        res.status(200).send(doc);
    })
}

exports.add = function(req, res) {
    const bookmark = new Bookmark({
        path: req.body.folder,
        owner: req.body.user,
    });

    bookmark.save((err, doc) => {
        if (err) { res.status(400).json({message: err }); return; }

        res.status(200).json({id : doc._id})
    });
}

exports.isBookmarked = function (folder) {
    return Bookmark.find({path: folder}).exec();
}