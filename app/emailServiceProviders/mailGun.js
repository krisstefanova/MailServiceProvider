let request = require('request');
let config = require('../../config/default');

let credentials = config.emailServiceProviders.mailGun;

/*
* Sends the email to a 3rd party service provider
*/
function sendEmail(data, callback) {
  data = createFormBodyRequest(data);

  try {
    request.post({
      url: credentials.url,
      auth: {
        user: credentials.user,
        pass: credentials.api_key
      },
      formData: data
    }, function (err, httpResponse, body) {
      if (httpResponse.statusCode == 200) {
        callback(null, 1);
      } else {
        let errorObj = new Error("Something went wrong - StatusCode: " + httpResponse.statusCode);
        callback(errorObj, null);
      }
    });
  } catch(error) {
    console.log("Error occured " + error.message);
  }
}

/*
* Parse the email data to the format required by the 3rd party service provider
*/
function createFormBodyRequest(data) {
  let bodyRequest = {
    to: data.emailTo,
    from: data.emailFrom,
    subject: data.subject,
    text: data.message,
  };

  setIfPresent(bodyRequest, 'cc', data.cc);
  setIfPresent(bodyRequest, 'bcc', data.bcc);

  return bodyRequest;
}

/*
* Helper set function
*/
function setIfPresent(obj, key, value) {
  if (value !== '') {
    obj[key] = value;
  }
}

module.exports = {
  sendEmail
};
