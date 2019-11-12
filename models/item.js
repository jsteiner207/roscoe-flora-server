const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  first_name: {
    type: String,
    required: false
  },
  last_name: {
    type: String,
    required: true
  },
  email_name: {
    type: String,
    required: false
  },
  phone_number: {
    type: String,
    required: false
  },
  outfit_changes: {
    type: String,
    required: false
  },
  photoshoot_type: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  appointment_id: {
    type: String,
    required: false
  },
  appointment_date: {
    type: String,
    required: false
  },
  special_requests: {
    type: String,
    required: false
  },
  date_scheduled: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
