// routes.js
let emailProvider = require('./sendEmailController');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

  app.post('/', function(req, res) {
    if (blankRequiredField(req)) {
      return res.render('index', {error: "Please, input all required (*) fields"});
    }
    emailProvider.sendDataToEmailProvider(req.body, function(error, data) {
      if (error) {
        res.render('index.ejs', {error: "Excuse us, our email provider is unavailable at the moment"});
      } else {
        res.render('index.ejs', {success: "You successfully sent an email"});
      }
    })
  })
}

/*
* Performs basic validation of user input
*/
function blankRequiredField(req) {
  let check = req.body.emailFrom == "" ||
    req.body.emailTo == "" ||
    req.body.subject == "" ||
    req.body.message == "";

  return check;
}
