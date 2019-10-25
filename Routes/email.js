const express =    require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')

const router = express.Router();



const adminbody = `
    <h1>a new email has been sent my guy</h1>
    <P>this is used for the admin account</p>`;



router.get('/', (req, res) => {
    res.send('email demo');
});

router.post('/', (req, res) => {
    console.log("an attemp is made");
    mailCustomer(req).catch(console.error);
    mailAdmin().catch(console.error);
})

async function mailCustomer(req){
    

    let userbody = `
    <h1>thanks for choosing roscoeflora, your appointment id is ${req.body.appointment_id}</h1>`;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.google.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "roscoefloraservicer@gmail.com", // auto emailers email
            pass: "FuzzyTaco2019" // auto emailers password
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"nodemailer contact" <roscoefloraservicer@gmail.com>', // sender address
        to: req.body.email_name,         //  , baz@example.com',  list of receivers
        subject: 'appointment request', // Subject line
        text: 'Hello world?', // plain text body
        html: userbody// html body
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

async function mailAdmin(){
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.google.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "roscoefloraservicer@gmail.com", // auto emailers email
            pass: "FuzzyTaco2019" // auto emailers password
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"nodemailer contact" <roscoefloraservicer@gmail.com>', // sender address
        to: 'jsteiner207@gmail.com',//  , baz@example.com',  list of receivers
        subject: 'Appointment confirmation', // Subject line
        text: 'Hello world?', // plain text body
        html: adminbody// html body
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = router;