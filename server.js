// imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const user = require('./routes/user.js');
const appointment = require('./routes/appointment.js');
const prescription = require('./routes/prescription.js');
const pharmacy = require("./routes/pharmacy.js");

// app init
const app = express();
const port = process.env.PORT || 8000;  // PORT set by env or 8080
app.use(morgan('tiny'));                // logging requests
app.use(cors());                        // enable CORS
app.use(bodyparser.json());             // body-parser for json
app.use(bodyparser.urlencoded({         // body-parser for urlencoded
    extended: false
}));



// default route
app.get('/', (req, res) => {
    res.send('Yep, works!');
});

// use routers
app.use('/user', user);
app.use('/appointment', appointment);
app.use('/prescription', prescription);
app.use('/pharmacy', pharmacy);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://viron:GqZkjxd283@cluster0.7p7fp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://viron:GqZkjxd283@cluster0.7p7fp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});


// listen to port or 8080
app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});