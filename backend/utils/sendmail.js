const http = require("http");
require('dotenv').config({});

const nodemailer = require("nodemailer");

const sendMail = async(mail, res) => {

    const details = mail ;
    const auth = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL ,
            pass: process.env.PASS,
        },
        secure: true,
        port: 465,
    });

    const receiver = {
        from: process.env.EMAIL,
        to: details.email,
        subject: details.subject,
        text: details.message,
    };


    try{

      const mailResponse = await auth.sendMail(receiver, (error, emailResponse) => {
        if (error) {
          console.log(error);
          // res.status(400).send("Error :",error);
        }
        else
        {
          console.log("success!");
          // res.status(200).send("Message sent" + emailResponse);
        }
       
      })

      console.log(mailResponse);
    } catch(err)
    {
      console.log(err);
    }
 

}


module.exports = sendMail