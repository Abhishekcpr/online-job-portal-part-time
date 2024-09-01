const express  = require('express')
const router = express.Router() ;
const authController = require('../controllers/auth-controller.js')
const contactController = require('../controllers/contact-controller.js')
const verifyToken = require('../middleware/jobs-middleware.js')
const sendMail = require('../utils/sendmail')

// router.use(verifyToken)

router.route('/').get(authController.homePage) ;
router.route('/sendmail').post(sendMail) ;

router.route('/signup').post(authController.signup) ;
router.route('/login').post(authController.login) ;
router.route('/profile/:id').get(verifyToken,authController.profileData) ;
router.route('/profile/').get(verifyToken,authController.getAllWorkers) ;
router.route('/profile/:id').patch(verifyToken,authController.updateLocation) ;
router.route('/contact').post(contactController.contact) ;


module.exports = router ;