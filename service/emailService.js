var user = require('../model/usermoduleSchema')
var nodemailer = require('nodemailer')
var dotenv=require('dotenv')


var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "prachi.demo25@gmail.com",
        pass: "jurpihmrjzstbbeg"
    }
});

var mailOption = {

    from: "prachi.demo25@gmail.com",
    to: "prachiverma2521@gmail.com",
    subject: "password reset request",
    text: `click on this link to reset password`,
}

module.exports = {
    transporter,
    mailOption
}
// transporter.sendMail(mailOption,(error,info)=>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log('Email sent Successfully'+info.response);
//     }
// })