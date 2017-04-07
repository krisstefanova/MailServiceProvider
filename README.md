#<font color='green'>SPA Mail Service Provider</font>

***

SPA Mail Service Provider is a simple way to send emails in an app.

***

Here is how to install the run the app. It uses two 3rd party service providers - MailGun and SendGrid. MailGun is the primary one used. If it fails for some reason to send an email with the data you filled, SendGrid will be used as a failover solution. If it doesn't work for some other mysterious reason, then you will just receive a notification "Excuse us, our service is unavailable at the moment". Enjoy! :)

***

###Installation

If you would like to download the code and try it for yourself:

1. Clone the repo:
>$ git clone https://github.com/krisstefanova/MailServiceProvider.git


2. Install the packages:
>$ npm install

3. Change out the configuration in config/default.js
You have to fill the api keys from MailGun and SendGrid. You can quickly register and take one for free.
There are some specifics about the 3rd party providers APIs so maybe it's a good idea to read the documentation as well. For example, for MailGun you have to set all emails that you will use for recipients and authorize them. This is, of course, if you don't configure your domain within the service.

4. Launch:
>$ node start


5. Visit in your browser at: `http://localhost:8080`

***

#### How to use the app and submit data

It's super easy! There are 4 fields that are required. They are all marked with *. If you want to include more than one recipient, please separate them with a comma. For example: To: kristina@domain.com, kstefanova@domain.com
