var db = require("../models");

module.exports = function(app) {
    app.get("/api/vocab", function(req, res) {
        db.Vocab.findAll()
        .then(results => {
            console.log("vocabulary sent", results[0].dataValues);
            res.json(results);
        });
    });

    app.post("/api/vocab", function(req, res) {
        console.log("req", req.body);
        db.Vocab.create({
            nativeword: req.body.nativeword,
            nativelanguage: req.body.nativelanguage,
            translatedword: req.body.translatedword,
            difficulty: req.body.difficulty,
            definitions: req.body.definition,
            notes: req.body.note,
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: req.body.UserId,
            LanguageId: req.body.LanguageId,
            VocabListId: req.body.VocabListId
        })
        .then(results => {
            res.json(results);
        });
    });

    app.put("/api/vocab/:id", function(req, res){
        db.Vocab.update(req.body,
            {
                where : {
                    id : req.params.id
                }
            }).then(function(results){
                res.json(results);
            });
    });

    app.delete("/api/vocab/:id", function(req,res){
        db.Vocab.destroy ({
            where: {id : req.params.id}
        }).then(function(results) {
            res.json(results);
        });
    });

    app.delete("/api/allvocabs/:id", function(req, res) {
        db.Vocab.destroy ({
            where: {VocabListId: req.params.id}
        }).then(function(results) {
            res.json(results);
        });
    });
};