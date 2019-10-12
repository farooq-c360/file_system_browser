
const { User } = require('../models/user');

exports.list = function(req, res) {
    userId = req.params.user;
    console.log(Recent);
    User.find({owner: userId}).exec((err, doc) => {
        if (err) { res.json({ status: 400, message: err }) }

        res.send(doc);
    })
}

exports.add = function(req, res) {
    const user = new User(req.body.user);

    user.save((err, doc) => {
        if (err) { res.status(400).json({ message: err }) }
        res.status(200).json({
            message: 'Success',
            userId : doc.id
        })
    });
}