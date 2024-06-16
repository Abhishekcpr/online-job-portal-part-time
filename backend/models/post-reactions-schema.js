const mongoose = require('mongoose')
const User = require('./user-schema')
const Posts = require('./posts-schema')

const postsReactionSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Posts',  
      },
  
   like : {
    type: Boolean,
    default : false
   },

   comment : {
    type : String,
    default : ""
   }

  
},{ timestamps: true })

const PostReactions = new mongoose.model('PostReaction',postsReactionSchema) ;
module.exports = PostReactions;