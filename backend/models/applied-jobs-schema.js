const mongoose = require('mongoose')
const User = require('./user-schema')
const Createdjob = require('./created-jobs-schema')
const appliedJobsSchema = new mongoose.Schema({
   candidate:{
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',  
   },
   job:{
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Createdjob',  
   },
  
   demandedBudget:{
    type : String,
    required: true,
    default : "0"
   },
   description:{
    type: String,
    
   },
   applicationStatus:{
    type:String,
    default: "pending",
    enum: ["pending", "accepted","rejected"]
   }
    
   
},{timestamps:true})

const AppliedJob = new mongoose.model('Appliedjob',appliedJobsSchema) ;
module.exports = AppliedJob;