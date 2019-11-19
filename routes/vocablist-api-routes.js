var db = require("../models");

module.exports = function(app) {
    app.get("/api/vocablists", function(req, res) {
        db.VocabList.findAll({
            include: [
                {
                    model: db.Vocab,
                    
                }
            ]
        })
        .then(results => {
            res.json(results);
        });
    });

    app.get("/api/vocablists/:id", function(req, res) {
        db.VocabList.findAll({
            include: [
                {
                    model: db.Vocab
                }
            ],
            where: {
                id: req.params.id
            }
        })
        .then(results => {
            res.json(results);
        })
    })

    app.post("/vocablist/:vocablist/", function(req, res) {
        console.log("USER ID:", req.user.id)
        db.VocabList.create({
            name: req.params.vocablist,
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: req.user.id
        })
        .then(results => {
            res.json(results);
        });
    });

    app.delete("/api/vocablist/:id", function(req,res){
        db.VocabList.destroy({
            where : {id : req.params.id}
        }).then(function(results){
            res.json(results);
        })
    })

    app.put("/api/vocablist/:id", function(req,res){
        db.VocabList.update(req.body,
            {
                where : {id : req.params.id}
            }).then(function(results){
                res.json(results);
            })
    })
};