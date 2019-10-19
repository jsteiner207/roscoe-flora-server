const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/item');

// @route   GET api/items
// @desc    All Items
// @access  Public

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1})  // 1 is ascending, -1 is descending, we want descending
        .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create A Item
// @access  Public

router.post('/', (req, res) => {
    const newItem = new Item({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });

    newItem.save()
        .then(item => {
            res.json(item)
            console.log(item.first_name + " was added to the database")
            })  
        .catch(() => console.log("That was some weird shit my guy"));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
        .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});




module.exports = router;