let request = require('request');
let _ = require('lodash');
let config = require('../../config/default');

let credentials = config.emailServiceProviders.sendGrid;

/*
* Sends the email to a 3rd party service provider
*/
function sendEmail(data, callback) {
  let header = {
    [credentials.user]: [credentials.api_key]
  }

  data = createFormBodyRequest(data);

  try {
    request.post({
      url: credentials.url,
      headers: header,
      json: data
    }, function (err, httpResponse, body) {
      if (httpResponse.statusCode == 202) {
        callback(null, 1);
      } else {
        let errorObj = new Error("Something went wrong - StatusCode: " + httpResponse.statusCode);
        callback(errorObj, null);
      }
    })
  } catch(error) {
    console.log("Error occured " + error.message);
  }
}

/*
* Parse the email data to the format required by the 3rd party service provider
*/
function createFormBodyRequest(data){
  let bodyRequest = {};

  addressMultipleRecepients(data);
  bodyRequest.personalizations = [];

  //there is always at least one recepient
  bodyRequest.personalizations.push({ to : []});

  addressPersonalizations(bodyRequest.personalizations, data.emailTo, "to");
  addressPersonalizations(bodyRequest.personalizations, data.cc, "cc");
  addressPersonalizations(bodyRequest.personalizations, data.bcc, "bcc");

  //other service provider specific data transformations
  bodyRequest.from = {};
  bodyRequest.from.email = data.emailFrom;
  bodyRequest.subject = data.subject;
  bodyRequest.content = [];
  bodyRequest.content[0] = {type:'text/plain'};
  bodyRequest.content[0].value = data.message;

  return bodyRequest;
}

/*
* Helper parse function
* If there are multiple recepients, store them in an array
*/
function addressMultipleRecepients(data){
  try {
    for (let i in data) {
      if (i === "emailTo" || i === "cc" || i === "bcc") {
        if (data.i != "" && data[i].indexOf(',') !== -1) {
          data[i] = data[i].split(",").map(function(el) {
            return el.trim();
          })
        }
      }
    }
  } catch(error) {
    console.log("Error occured " + JSON.stringify(error));
  }
}

/*
* Helper parse function
* Multiple email addresses require very specific structure
*/
function addressPersonalizations(dataStructure, recipients, emailSubject) {
  if (recipients !== "") {
    if (!dataStructure[0][emailSubject]) {
      dataStructure[0][emailSubject] = [];
    }
    if (recipients instanceof Array === true) {
      for (let i = 0; i < recipients.length; i++) {
        dataStructure[0][emailSubject].push({ email: recipients[i] });
      }
    } else {
      dataStructure[0][emailSubject][0] = { email: recipients };
    }
  }
}

module.exports = {
  sendEmail
}
