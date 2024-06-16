const Contact = require('../models/contact-schema.js')
const Nexmo = require('nexmo');

const contact = async(req,res)=>{
    try{
        const {username , email , message} = req.body ;
        const contactData = await Contact.create({
        username,
        email,
        message})

        if(contactData!= undefined)
        {
            console.log("contact data created",contactData);
        }
        res.status(201).send({msg : contactData})
       
    }catch(err)
    {
        console.log("some error :",err);
        res.status(400).send({msg :err})
    }
}

module.exports = {contact}