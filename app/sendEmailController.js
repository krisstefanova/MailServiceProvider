let http = require("http");
let config = require('../config/default');

//init all service providers
let serviceProvider = require('./emailServiceProviders/mailGun');
let failOverServiceProvider = require('./emailServiceProviders/sendGrid');

/*
* Sends the email data to a service provider
*/
function sendDataToEmailProvider(data, callback) {
  try {
    //sends to the first email provider
    serviceProvider.sendEmail(data, function(error, result) {
      //if there is a problem with the service provider, use the failover service provider
      if (error) {
        failOverServiceProvider.sendEmail(data, function(error, result) {
          //if the email was sent successfully or there is a problem with the failover service provider, notify the caller
          callback(error, result);
        })
      } else {
        //if the email is successfully sent, notify the caller
        callback(error, result);
      }
    })
  } catch(error) {
    console.log("Error occured " + error.message);
  }
}

module.exports = {
  sendDataToEmailProvider
}
