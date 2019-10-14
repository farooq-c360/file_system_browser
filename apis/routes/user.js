
const { User } = require('../models/user');

exports.list = function(req, res) {
    userId = req.params.user;
    User.find({owner: userId}).exec((err, doc) => {
        if (err) { res.json({ status: 400, message: err }); return; }

        res.status(200).send(doc);
    })
}

exports.add = function(req, res) {
    const user = new User(req.body.user);

    user.save((err, doc) => {
        if (err) { res.status(400).json({ message: err }); return; }
        res.status(200).json({
            message: 'Success',
            userId : doc.id
        })
    });
}