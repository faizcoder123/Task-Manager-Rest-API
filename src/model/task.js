const mongoose = require('mongoose');
const validator = require('validator');
const User=require('../model/user');
const taskSchema =new mongoose.Schema( {
   description: {
       type: String,
       required: true,
       trim: true
   },
   completed: {
       type: Boolean,
       default: false
   },
   owner:{
     type: mongoose.Schema.Types.ObjectId,// give id
     required:true,
     ref:'User'// creating relationship
   },
   file:{
     type:Buffer
   }

},{
  timesstamps: true
}

)
 const Task = mongoose.model('Task',taskSchema)

module.exports=Task
