const mongoose = require('mongoose');
const validator = require('validator');
//task-manager-api is name
require('dotenv').config()
 mongoose.connect('process.env.MONGODB_URI ||mongodb://localhost/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true//quicly access
});

// validte
//model -model any data
// const User = mongoose.model('User',{
//   name:{
//     type:String,
//     required:true
//   },
//   email:{
//     type:String,
//     required:true,
//     validate(value){
//       if(!validator.isEmail(value)){
//         throw new Error("Email must be correct")
//       }
//     }
//   },
//   age:{
//     type:Number,
//     default:0,
//     validate(value){
//       if(value<0){
//         throw new Error("must be +")
//       }
//     }
//   }
// });
//
// //creating data using constructor
// const me=new User({
//   name:'faiz',email:'faizhaq247@gmail.com'
// })
// // saving me object in database
// //using promises
//save data and return promise
// me.save().then((res)=>{
//   console.log(res);
// }).catch((error)=>{
//   console.log("error",error);
// })
//
//

// creating task model
// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })


// const me = new User({
//     name: '   Andrew  ',
//     email: 'MYEMAIL@MEAD.IO   ',
//     password: 'phone098!'
// })


//
// const task = new Task({
//     description: '  Eat lunch'
// })
//
// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })
