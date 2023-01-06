var express = require("express");
var router = express.Router();
var Event = require("../models/event");

/* GET users listing. */
router.get("/", function (req, res, next) {
  Event.find({}, (err, events) => {
    if (err) return next(err);
    res.render("about.ejs", { events: events });
  });
});

module.exports = router;
 