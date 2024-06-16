const express  = require('express')
const router = express.Router() ;
const authController = require('../controllers/auth-controller.js')
const contactController = require('../controllers/contact-controller.js')
const sendMail = require('../utils/sendmail')

router.route('/').get(authController.homePage) ;
router.route('/sendmail').post(sendMail) ;

router.route('/signup').post(authController.signup) ;
router.route('/login').post(authController.login) ;
router.route('/profile/:id').get(authController.profileData) ;
router.route('/profile/').get(authController.getAllWorkers) ;
router.route('/profile/:id').patch(authController.updateLocation) ;
router.route('/contact').post(contactController.contact) ;


module.exports = router ;