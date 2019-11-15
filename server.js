const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const email = require("./Routes/email");
const items = require("./Routes/api/items");
const accounts = require("./Routes/api/accounts");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//database key
const db = require("./keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(ERR => console.log(ERR));

// Use items
const port = process.env.PORT || 5000;

app.use("/api/items", items);
app.use("/api/accounts", accounts);
app.use("/email", email);

app.get("/", (req, res) => {
  res.send("this is the servers root");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
