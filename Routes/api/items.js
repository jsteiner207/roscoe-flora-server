const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/item");

// @route   GET api/items
// @desc    All Items
// @access  Public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 }) // 1 is ascending, -1 is descending, we want descending
    .then(items => res.json(items));
});

//this is used to search for an appointment id and sends the data for that appointment back to the appointment page
router.get("/:appointmentid", (req, res) => {
  console.log(req.params.appointmentid);
  Item.findOne({ appointment_id: req.params.appointmentid }).then(items =>
    res.json(items)
  );
});

router.put("/:appointmentid", (req, res) => {
  Item.findOneAndUpdate(
    { appointment_id: req.params.appointmentid },
    req.body
  ).then(() => res.json({ success: true }));
});

// @route   POST api/items
// @desc    Create A Item
// @access  Public

router.post("/", (req, res) => {
  const newItem = new Item({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_name: req.body.email_name,
    phone_number: req.body.phone_number,
    outfit_changes: req.body.outfit_changes,
    photoshoot_type: req.body.photoshoot_type,
    location: req.body.location,
    address: req.body.address,
    special_requests: req.body.special_requests,
    appointment_id: req.body.appointment_id,
    appointment_date: req.body.appointment_date
  });

  newItem
    .save()
    .then(item => {
      res.json(item);
      console.log(item.first_name + " was added to the database");
    })
    .catch(() => console.log("That was some weird shit my guy"));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
