const mongoose = require('mongoose')
const Post = mongoose.model('Post', {    

    status: {
        type: String,
        require:true,
        trim: true
    },
    image: {
        type: String,
        require:true,
        trim: true
    },
    
    name:{
        type: String,
        require:true,
        trim: true
    }
    
  })

  module.exports = Post