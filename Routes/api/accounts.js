const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // used to encrpyt passwords

// Account Model
const Account = require("../../models/account");

router.get("/", (req, res) => {
  Account.find().then(accounts => res.json(accounts));
});

// !! Need to get this to not allow duplicate accounts !
router.post("/", async (req, res) => {
  try {
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch {
    console.log(null);
  }
  const newAccount = new Account({
    user_name: req.body.user_name,
    password: hashedPassword
  });

  newAccount
    .save()
    .then(account => {
      res.json(account);
      console.log(account.user_name + " was added to the database");
    })
    .catch(() => console.log("That was some weird shit my guy"));
});
router.post("/:user_name", (req, res) => {
  Account.findOne({ user_name: req.params.user_name })
    .then(async accounts => {
      try {
        console.log(accounts.password);
        var auth = await bcrypt.compare(req.body.password, accounts.password);
      } catch {
        console.log(null);
      }
      console.log(auth);
      auth ? res.json({ status: true }) : res.json({ status: false });
    })
    .catch(() => res.json({ status: false }));
});

module.exports = router;
