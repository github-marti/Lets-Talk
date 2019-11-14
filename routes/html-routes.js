// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, async function (req, res) {
    try {
      let vocabListData = await db.VocabList.findAll({
        include: [
          {
            model: db.Vocab,
            include: [
              {
                model: db.Language,
                attributes: ['name']
              }
            ]
          },
          {
            model: db.User,
          }
        ],
        where: {
          UserId: req.user.id
        }
      });

      if (vocabListData[0]) {
        hbsObject = {
          vocabLists: vocabListData,
          username: req.user.username,
          userId: req.user.id,
          default: true
        }
      } else {
        hbsObject = {
          vocabLists: false,
          username: req.user.username,
          userId: req.user.id,
          default: true
        }
      }
      res.render("members", hbsObject);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/vocablists", isAuthenticated, async function (req, res) {
    try {
      let vocabListData = await db.VocabList.findAll({
        include: [
          {
            model: db.Vocab,
            include: [
              {
                model: db.Language,
                attributes: ['name']
              }
            ]
          },
          {
            model: db.User,
          }
        ],
        where: {
          UserId: req.user.id
        }
      });

      if (vocabListData[0]) {
        hbsObject = {
          vocabLists: vocabListData,
          listDisplay: true
        }
      } else {
        hbsObject = {
          vocabLists: false,
          listDisplay: true
        }
      }
      res.render("members", hbsObject);
    } catch (error) {
      console.log(error);
    };
  });

  app.get("/wordsearch", isAuthenticated, async function (req, res) {
    try {
      let vocabListData = await db.VocabList.findAll({
        include: [
          {
            model: db.Vocab,
            include: [
              {
                model: db.Language,
                attributes: ['name']
              }
            ]
          },
          {
            model: db.User,
          }
        ],
        where: {
          UserId: req.user.id
        }
      });

      let languageData = await db.Language.findAll();

      if (vocabListData[0]) {
        hbsObject = {
          vocabLists: vocabListData,
          languages: languageData,
          wordsearch: true
        };
      } else {
        hbsObject = {
          vocabLists: false,
          languages: languageData,
          wordsearch: true
        };
      };

      res.render("members", hbsObject);
    } catch (error) {
      console.log(error);
    }
  })

  app.get("/flashcards", isAuthenticated, async function (req, res) {
    try {
      let vocabListData = await db.VocabList.findAll({
        include: [
          {
            model: db.Vocab,
            include: [
              {
                model: db.Language,
                attributes: ['name']
              }
            ]
          },
          {
            model: db.User,
          }
        ],
        where: {
          UserId: req.user.id
        }
      });

      if (vocabListData[0]) {
        hbsObject = {
          vocabLists: vocabListData,
          flashcards: true
        }
      } else {
        hbsObject = {
          vocabLists: false,
          flashcards: true
        }
      }
      res.render("members", hbsObject);
    } catch (error) {
      console.log(error);
    }
  })
};
