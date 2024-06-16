const mongoose = require('mongoose')
const User = require('./user-schema')
const CreatedJobs = require('./created-jobs-schema')
const testimonialSchema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',  
      },
   employee: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',  
  },

  job: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Createdjob',  
  },

  salary: {
    type : Number,
    required : true
  },
   startDate:{
    type: Date,
    default : new Date()
   },

   endDate:{
    type : Date,
    default : new Date()
   },

   rating:{
    type: Number,
    required : true,
   },
   
   message:{
    type: String,
    required : true
   }


},{ timestamps: true })

const Testimonials = new mongoose.model('Testimonial',testimonialSchema) ;
module.exports = Testimonials;