const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AccountSchema = new Schema({
  user_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = account = mongoose.model("account", AccountSchema);
