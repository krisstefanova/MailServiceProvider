module.exports = {
  "port": 8080,
  "emailServiceProviders": {
    "mailGun": {
      "user": "api",
      "api_key": "<INSERT YOUR API KEY HERE>",
      "url": "https://api.mailgun.net/v3/<INSERT YOUR MAIL GUN SUBDOMAIN HERE>.mailgun.org/messages"
    },
    "sendGrid": {
      "user": "Authorization",
      "api_key": "Bearer <INSERT YOUR API KEY HERE>",
      "url": "https://api.sendgrid.com/v3/mail/send"
    }
  }
};
