const { Recent} = require('../models/recent');
exports.list = function(req, res) {
    userId = req.params.user;
    type = req.params.type;

    console.log(type);
    if(type === 'favourite')
    {
        Recent.find({owner: userId}).sort({accessCount : 'desc'}).limit(5).exec((err, doc) => {
            if (err) { res.json({ status: 400, message: err }) }

            res.send(doc);
        }) 
    } else {
        Recent.find({owner: userId}).sort({lastTimeAccessed : 'desc'}).limit(20).exec((err, doc) => {
            if (err) { res.json({ status: 400, message: err }) }
    
            res.send(doc);
        })
    }
}

exports.add = function(req, res) {
    //TODO messy code
    console.log(req.params.dir);
    var currentDir =  (req.params.dir === '--root--' || req.params.dir === undefined) ? '/' : req.params.dir;
    var query = req.query.path || '';
    if (query) currentDir = path.join(currentDir, query);
    console.log("updating recet ", currentDir);

    //TODO should use find one and update
    // var result = Recent.findOneAndUpdate(
    //     { id: "5d9ebc1e5a0001c442a3fa65"}, 
    //     { $inc: {accessCount: 10}}, 
    //     { useFindAndModify: false }, function(err, doc) {
    //         console.log('here:' + err + doc);
    //     }
    // );
    Recent.find({owner: '5d9ec846bbf735c6917f737b', path: currentDir }).lean().exec((err, doc) => {
        if (err) { res.json({ status: 400, message: err }) }

        console.log('find:' + err + JSON.stringify(doc));
        if(doc.length > 0) {
            let foundDoc = doc[0];
            foundDoc.accessCount = foundDoc.accessCount + 1;
            foundDoc.lastTimeAccessed = new Date();
        
            const recent = new Recent(foundDoc);
            recent.updateOne(foundDoc, (err, doc) => {
                if (err) { throw err }

                console.log('done');
            });
        } else {
            const recent = new Recent({
                path: currentDir,
                accessCount: 1,
                lastTimeAccessed: new Date(), 
                owner: '5d9ec846bbf735c6917f737b'
            });
        
            recent.save((err, doc) => {
                if (err) { res.json({ status: 400, message: err }) }
            });
        }
    });
}