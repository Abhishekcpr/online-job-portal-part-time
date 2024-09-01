const express = require('express')
const jobsController = require('../controllers/jobs-controller.js')
const verifyToken = require('../middleware/jobs-middleware.js')
const jobsRouter = express.Router()

jobsRouter.use(verifyToken)
jobsRouter.route('/createjob').post(jobsController.createJob)
jobsRouter.route('/getalljobs').get(jobsController.getAllJobs)
jobsRouter.route('/getallworkers').get(jobsController.getAllWorkers)
jobsRouter.route('/saveprofile').patch(jobsController.saveProfile)
jobsRouter.route('/removeprofile').patch(jobsController.removeProfile)
jobsRouter.route('/getsavedprofile/:id').get(jobsController.getSavedProfile)
jobsRouter.route('/jobapply').post(jobsController.jobApply)
jobsRouter.route('/getapplications/:id').get(jobsController.getJobApplications)
jobsRouter.route('/getapplicationsbycandidateid/:id').get(jobsController.getJobApplicationsByCandidateId)
jobsRouter.route('/removejob/:id').delete(jobsController.deleteJob)
jobsRouter.route('/applicationstatus').patch(jobsController.changeApplicationStatus)
jobsRouter.route('/withdraw/:id').patch(jobsController.withdrawApplication)
jobsRouter.route('/completejob').post(jobsController.createTestimonial)
jobsRouter.route('/getcompletedjob').get(jobsController.getCompletedJobs)
jobsRouter.route('/gettestimonial/:id').get(jobsController.getTestimonials)


module.exports = jobsRouter ;