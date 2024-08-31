const CreatedJob = require('../models/created-jobs-schema.js')
const User = require('../models/user-schema.js')
const AppliedJob = require('../models/applied-jobs-schema.js')
const sendMail = require('../utils/sendmail.js')
const categoryImage = require('../utils/categoryImage.js')
const Testimonials = require('../models/testimonials-schema.js')

const createJob = async(req,res)=>{
    try{

        const {category, description, startDate, duration, budget,locationCoord,locationAdd,employer} = req.body;
       
        // console.log(categoryImage);
        let image = categoryImage.other ;
      
        
            if(categoryImage.hasOwnProperty(category))
            image = categoryImage[category] ;

       console.log("employer id: ",employer);
       console.log("employer id: ",image);
        const jobCreate = await CreatedJob.create({category, description, image, startDate, duration, budget,locationCoord,locationAdd,employer,
        createdAt : new Date()
        })

            

            console.log("New job created " + jobCreate);
            
            res.status(201).json({message : "job created", jobId : jobCreate._id.toString()}) ;

    } catch(err)
    {
        console.log("Got this error", err);
        res.status(500).send({msg: "Some error occurred" + err});

    }
};

const getAllJobs = async(req,res)=>{
    try{
         const allJobsData = await CreatedJob.find().populate('employer').sort({createdAt : -1}) ;

         if( allJobsData == undefined || allJobsData.length == 0)
         {
            res.status(404).send({msg : "No jobs data found"}) ;
         }
         else
         {
            res.status(200).send({msg : allJobsData }) ;
         }
    } catch(err)
    {
        res.status(404).send({msg: `Error : ${err}`}) ;

    }


}


const getAllWorkers = async(req,res)=>{
    try{
         const allWorkers = await User.find() ;

         if( allWorkers == undefined || allWorkers.length == 0)
         {
            res.status(404).send({msg : "No Workers data found"}) ;
         }
         else
         {
            res.status(200).send({msg : allWorkers }) ;
         }
    } catch(err)
    {
        res.status(404).send({msg: `Error : ${err}`}) ;

    }


}

const saveProfile = async(req,res)=>{
    try{

        const {userId, workerId} = req.body ;
       
        const saveWorkerProfile = await User.findOne({_id : userId})
       
        console.log("prof: ",saveWorkerProfile.savedProfiles);
        if (saveWorkerProfile && !saveWorkerProfile.savedProfiles.includes(workerId))
        {
            console.log("read");
            await User.updateOne({_id : userId}, { $push: { savedProfiles: workerId } })
            res.status(200).send({msg:"update done successfully"})
        }
        else
        res.status(400).send({msg : "Profile already saved"})

    }catch(err)
    {
        res.status(400).send({msg : `error : ${err}`})
        console.log(err);
    }
}

const removeProfile = async(req,res)=>{
    try{

        const {userId, workerId} = req.body ;
       
        const saveWorkerProfile = await User.updateOne({_id : userId}, { $pull: { savedProfiles: workerId } })
       

        if(saveWorkerProfile)
        {
            res.status(200).send({msg:"update done successfully"})
        }

    }catch(err)
    {
        res.status(400).send({msg : `error : ${err}`})
        console.log(err);
    }
}

const getSavedProfile = async (req, res) => {
    try {
      const _id = req.params.id;
  
      // Use populate with options for better control and efficiency
      const user = await User.findOne({ _id })
        .populate('savedProfiles')
  
      if (!user) {
        return res.status(404).send({ msg: 'User not found' });
      }
  
      const savedProfiles = user.savedProfiles; 
  
      res.status(200).send({ savedProfiles });
    } catch (err) {
      console.error(err); 
      res.status(500).send({ msg: 'Internal Server Error' });
    }
  };

  const jobApply = async(req,res)=>{
    try{
        const {userId, jobId,demandedBudget,description,workerMail="", employerMail=""} = req.body ;
        const applicationExist = await AppliedJob.find({candidate: userId,job : jobId});

        if(applicationExist && applicationExist.length > 0)
        {
            return res.status(401).send({msg:"Already applied"})
        }

        const applyToJob = await AppliedJob.create({
            candidate:userId,
            job: jobId,
             demandedBudget,
             description,
             createdAt: Date.now()
        })

        if(applyToJob)
        {
            // console.log(req.body.workerMail, req.body.employerMail);
           if(req.body.workerMail.length > 0 && req.body.employerMail.length > 0)
           {
            const mailResponse1 =   await sendMail(req.body.workerMail,res) ;
            const mailResponse2 = await sendMail(req.body.employerMail,res) ;
           }

            
           
            // console.log(applyToJob);
            res.status(201).send({msg: "Job applied successfully"})
        }
        else
        {
            res.status(401).send({msg : "Could not apply"})
        }

        

    }catch(err)
    {
        console.log("The error : "+err);
        
        res.status(400).send({msg : `Error : ${err}`})
    }
  }

  const withdrawApplication = async(req,res)=>{
    try{

        const userId = req.params.id ;
       
        const withdraw = await AppliedJob.updateOne({_id : userId}, { applicationStatus : 'withdrawn' })
       

        if(withdraw)
        {
            res.status(200).send({msg:"Application withdrawn successfully"})
        }

    }catch(err)
    {
        res.status(400).send({msg : `error : ${err}`})
        console.log(err);
    }
}

  const getJobApplications = async(req,res)=>{
    try{

        const jobId = req.params.id ;
        
        const applications = await AppliedJob.find({job : jobId}).populate('candidate') ;
        console.log(applications);
        if(applications != undefined)
        {
          return  res.status(200).send({msg : applications})
        }
        res.status(400).send({msg : "No jobs found"})
    }
    catch(err)
    {
        res.status(400).send({msg : "Error:" + err})
    }
  }

  const getJobApplicationsByCandidateId = async(req,res)=>{
    try{

        const candidateId = req.params.id ;
        
        const applications = await AppliedJob.find({candidate : candidateId}).populate('job') ;
        console.log(applications);
        if(applications != undefined)
        {
          return  res.status(200).send({msg : applications})
        }
        res.status(400).send({msg : "No job applications found"})
    }
    catch(err)
    {
        res.status(400).send({msg : "Error:" + err})
    }
  }


  const deleteJob = async(req,res)=>{
    try{

        const _id = req.params.id ;

        const jobRemove = await CreatedJob.deleteOne({_id})

        if(jobRemove)
        {
            console.log(jobRemove);
          return  res.status(200).send({msg: "Job deleted successfully"}) ;
        }

        res.status(400).send({msg: "Deletion not done"})

    }catch(err)
    {
        res.status(400).send({msg : "Could not delete due to" + err}) ;
    }
  }

  const changeApplicationStatus = async(req,res)=>{
    try{
        const {_id, status} = req.body ;
        const updateStatus = await AppliedJob.updateOne({_id}, {applicationStatus : status}) ;

        if(updateStatus)
        {
          return  res.status(200).send({msg : `Job ${status}`}) ;
        }

        res.status(400).send({msg : `Status update failed `}) ;
    } catch(err)
    {
        res.status(400).send({msg : `Error ${err}`}) ;
    }
  }

  const createTestimonial = async(req,res)=>{
   

    try{
        const {employerId, employeeId, jobId, salary, startDate, endDate, rating, message,feedbackMail,subject} = req.body ;
        const testimonial = await Testimonials.create({
            employer: employerId,
            employee : employeeId,
            job : jobId,
            salary,
            startDate,
            endDate,
            rating,
            message,
            createdAt : new Date()
        })
    
        if(testimonial)
        {
            await sendMail(feedbackMail, res)
            res.status(201).send({msg : "Job Completed Successfully"}) ;
        }

    } catch(err)
    {
        res.status(400).send({msg : `Error: ${err}`})
    }
  }

  const getTestimonials = async(req,res)=>{
     try{
        console.log("testimonials reached");
         const id = req.params.id ;
        const testimonials = await Testimonials.find({employee : id}).populate({path : 'employer', select : 'username image'});

        if(testimonials && testimonials.length > 0)
        {
          return  res.status(200).send({msg : testimonials})
        }

        

     } catch(err)
     {
        res.status(400).send({msg : `Error : ${err}`})
     }
  }

  const getCompletedJobs = async(req,res)=>{
    try{

        const jobs = await Testimonials.find().populate({path: 'employer', select : 'username'}).populate({path: 'employee', select : 'username'}).populate({path: 'job', select : 'category description'}).sort({endDate : -1}) ;

        if(jobs != undefined && jobs.length > 0)
            {

                return res.status(200).send({msg: jobs})
            }

        res.status(400).send({msg : "There are no completed jobs"})
    }catch(err)
    {
        res.status(400).send({msg : "Error :" + err})
    }
  }

module.exports = {createJob, getAllJobs, getAllWorkers, saveProfile , getSavedProfile, removeProfile,jobApply,getJobApplications, deleteJob,changeApplicationStatus,createTestimonial,getCompletedJobs , getTestimonials,getJobApplicationsByCandidateId,withdrawApplication}