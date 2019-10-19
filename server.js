const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');
const email = require('./routes/email');

const app = express()
app.use(bodyParser.json());

//database key
const db = require('./keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, {useNewUrlParser : true,  useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((ERR) => console.log(ERR));

    // Use items
const port = process.env.PORT || 5000;

app.use('/api/items', items);
app.use('/email', email);

app.get('/', (req, res) => {res.send('woah bitch woah')});

 app.listen(port, () => console.log(`Server started on port ${port}`));