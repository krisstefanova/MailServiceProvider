let express = require('express');
let bodyParser = require('body-parser');
let config = require('./config/default');

let app = express();
let port = process.env.port || config.port;

//configure the app server
//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// set up ejs for templating
app.set('view engine', 'ejs');

// routes ===========================
require('./app/routes.js')(app);

app.listen(port);

console.log("Server listening on port " + port);

module.exports = app; // for testing
