
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pabloartsy@gmail.com',
    pass: '9YgBPaD58Q6iTeV'
  }
});

exports.sendMail = (subject, message, toMail) => {

    var mailOptions = {
        from: 'pabloartsy@gmail.com',
        to: toMail,
        subject: subject,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    // sgMail.setApiKey('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')
    // const msg = {
    // to: 'satishnepali121@gmail.com', // Change to your recipient
    // from: 'Satish.nepali.a19@icp.edu.np', // Change to your verified sender
    // subject: 'Sending with SendGrid is Fun',
    // text: 'and easy to do anywhere, even with Node.js'
    // }
    // sgMail
    // .send(msg)
    // .then(() => {
    //     console.log('Email sent')
    // })
    // .catch((error) => {
    //     console.error(error)
    // })

}

