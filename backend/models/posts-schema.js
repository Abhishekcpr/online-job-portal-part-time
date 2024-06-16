const mongoose = require('mongoose')
const User = require('./user-schema')
const postsSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',  
      },
  
  content: {
    type : String,
    
  },

  imageUrl : {
    type: String
  }
 

},{ timestamps: true })

const Posts = new mongoose.model('Post',postsSchema) ;
module.exports = Posts;