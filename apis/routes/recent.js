const { Recent} = require('../models/recent');
exports.list = function(req, res) {
    userId = req.params.user;
    type = req.params.type;

    if(type === 'favourite')
    {
        Recent.find({owner: userId}).sort({accessCount : 'desc'}).limit(5).exec((err, doc) => {
            if (err) { res.status(400).json({message: err }); return; }

            res.send(doc);
        }) 
    } else {
        Recent.find({owner: userId}).sort({lastTimeAccessed : 'desc'}).limit(20).exec((err, doc) => {
            if (err) { res.status(400).json({message: err }); return; }
    
            res.status(200).send(doc);
        })
    }
}

exports.add = function(req, res) {
    //TODO messy code
    var currentDir =  (req.params.dir === '--root--' || req.params.dir === undefined) ? '/' : req.params.dir;
    var query = req.query.path || '';
    if (query) currentDir = path.join(currentDir, query);

    Recent.find({owner: '5d9ec846bbf735c6917f737b', path: currentDir }).lean().exec((err, doc) => {
        if (err) { res.status(400).json({message: err }); return; }

        if(doc.length > 0) {
            let foundDoc = doc[0];
            foundDoc.accessCount = foundDoc.accessCount + 1;
            foundDoc.lastTimeAccessed = new Date();
        
            const recent = new Recent(foundDoc);
            recent.updateOne(foundDoc, (err, doc) => {
                if (err) { throw err }
            });
        } else {
            const recent = new Recent({
                path: currentDir,
                accessCount: 1,
                lastTimeAccessed: new Date(), 
                owner: '5d9ec846bbf735c6917f737b'
            });
        
            recent.save((err, doc) => {
                if (err) { res.status(400).json({message: err }); return; }
            });
        }
    });
}