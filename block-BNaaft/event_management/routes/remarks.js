var express = require("express");
const Event = require("../models/event");
var router = express.Router();
var Remark = require("../models/remark");

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Remark.findById(id, (err, remark) => {
    if (err) return next(err);
    res.render("updateRemark", { remark });
  });
});

router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, req.body, (err, updatedremark) => {
    if (err) return next(err);
    res.redirect("/events/" + updatedremark.eventId);
  });
});

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndRemove(id, (err, deletedremark) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(
      deletedremark.eventId,
      { $pull: { remarks: deletedremark._id } },
      (err, event) => {
        if (err) return next(err);
        res.redirect("/events/" + deletedremark.eventId);
      }
    );
  });
});

router.get("/:id/inc", (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, event) => {
    if (err) return next(err);
    console.log(event);
    res.redirect("/events/" + event.eventId);
  });
});

module.exports = router;
