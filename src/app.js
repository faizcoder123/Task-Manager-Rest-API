
const mongodb = require('mongodb');//using mongob we connect database to nodejs
const MongoClient=mongodb.MongoClient;//its give access to necessary function that we need to connect to database

const ObjectID=mongodb.ObjectID;// generate own id
const ConnectionURL='mongodb://127.0.0.1:27017'
const dataBaseName='task-manager'
// id's are binary data
const id=new ObjectID()
//console.log(id);
//console.log(id.getTimestamp());

//asynchronous
//newUrl -parse new url
MongoClient.connect(ConnectionURL,{useNewUrlParser:true},(error,client)=>{// connect
  if(error){
  return console.log("Error");

  }
  //console.log("Connected");
const db=  client.db(dataBaseName); // return database reference

// asynchronous fun

// db.collection('users').insertOne({// insert
//   name:'faiz',age:27
// },(error,result)=>{
//    if(error){
//     return console.log("Unable to inset");
//    }
//    console.log(result.ops);
// })


 // collection users

// db.collection('users').insertMany([{// insert
//   name:'faiz',age:27,
//   // _id=2
// },
// {
//   name:'taiba',age:15
// }],
// (error,result)=>{
//    if(error){
//     return console.log("Unable to insert");
//    }
//    console.log(result.ops);
// })



//_id:new ObjectId("5f042854b9d1ce3af8e820a6");// converting string to binary using const



// db.collection('users').findOne({name:'taiba',age:15,},(error,result)=>{
//   if(error){
//       return console.log("Unable to insert");
//      }
//      // result not found return null not error
//     console.log(result);
// })


// find return cursor //no callback

//cursor calling toarray fun  fetch all valid document
// to array fun is asynchronous
// db.collection('users').find({name:'taiba',age:15,}).toArray((error,result)=>{
//   if(error){
//       return console.log("Unable to insert");
//      }
//      // result not found return null not error
//     console.log(result);
// })


// //count fun
// db.collection('users').find({name:'taiba',age:15,}).count((error,res)=>{
//   if(error){
//       return console.log("Unable to insert");
//      }
//      // result not found return null not error
//     console.log(res);
// })




// using promises not callback

// const update_promises=db.collection('users').updateOne(
//   {
//     _id:new ObjectID("5f0433f21420b91dccf5adf1")//parse to binary using constructor
//   },
//   {
// object of objects
//   $set:{
//     name:'faisal'
//   }
//   // $inc:{// increment without fetch
//   //   age:1
//   // }
//  }
// )
// if succes it will call then else catch
// update_promises.then((res)=>{
//   console.log(res);
// }).catch((error)=>{
//   console.log(error);
// })

// })

// const update_promises=db.collection('users').updateMany(
//   {
//     name:'faiz'
//   },
//   {
//   $set:{
//     name:'faizul'
//   }
//
//  }
// )
// update_promises.then((res)=>{
//   console.log(res);
// }).catch((error)=>{
//   console.log(error);
// })

//delete

const delete_promises=db.collection('users').deleteMany(
  {
    name:'faizul'
  },

)
delete_promises.then((res)=>{
  console.log(res);
}).catch((error)=>{
  console.log(error);
})


})
