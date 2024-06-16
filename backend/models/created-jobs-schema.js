const mongoose = require('mongoose')
const User = require('./user-schema')
const createdJobsScema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',  
      },
   category:{
    type: String,
    required : true,
   },
   description:{
    type: String,
    required : true,
   },
   image:{
    type: String,
    default : "https://img.freepik.com/premium-vector/people-workers-various-different-occupations-professions_88272-2484.jpg"
   },
   startDate:{
    type : Date,
    required : true
   },
   duration:{
    type: String,
    default : "0"
   },
   budget:{
    type : String,
    required: true,
    default : "0"
   },
    
   locationCoord:{
    type:[String]
   },
   locationAdd : {
    type: String,
    required: true
   },

   isJobOpen: {
    type : Boolean,
    default:true
   }


},{ timestamps: true })

const CreateJobs = new mongoose.model('Createdjob',createdJobsScema) ;
module.exports = CreateJobs;