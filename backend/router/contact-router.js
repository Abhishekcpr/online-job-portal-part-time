const express = require('express')
const contactRouter = express.Router()
const contactController  = require('../controllers/contact-controller.js')

contactRouter.route('/contact').post(contactController.contact) ;
module.exports = contactRouter ;