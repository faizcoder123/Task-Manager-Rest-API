const express=require('express');
const app=express();
const port=process.env.PORT||3000;
const auth=require('../middleware/auth.js')
require('./mongoose')// connect db mongooes.js// run files
const User=require('../model/user');
const Task=require('../model/task')//run files
// run files

const bcrypt=require('bcryptjs')

const main=async ()=>{
try{
  const user=await User.findById("5f15da09b2a3f517b0cc7bbc")
// console.log(user)
  await user.populate('tasks').execPopulate()// find all task created by user and store in user.tasks virtual
//  console.log(user.tasks)//its not arrray its virtual
}
catch(e){

}
}
main()



// parse json to obj automatic
app.use(express.json());
//promises chaining
// app.post('/user',(req,res)=>{
//   // console.log(req.body);
//   //res.send("testing");
//   const user=new User(req.body);// creating new user what we are getting
//
//   user.save().then(()=>{
//      res.send(user);
//   }).catch((error)=>{
//          res.status(400);// code error
//          res.send(error);
//   })
//
// })
//
// app.post('/task',(req,res)=>{
//   const task = new Task(req.body);
// // save is promises fun
//   task.save().then(() => {
//       res.send(task)
//   }).catch((error) => {
//     res.status(400);
//     res.send(error);
//   })
//
// })
// // reading data
// app.get('/users',(req,res)=>{
//   //find return promises
//   User.find({}).then((users)=>{
//      res.send(users);
//   }).catch((e) => {
//      res.status(500).send();
//   })
//
// })
// // particular user
// //route parameter :
// app.get('/user/:id',(req,res)=>{
//   //find return promises
//   const id=req.params.id;
//   User.findById(id).then((user)=>{
//     if(!user){
//     //  conole.log("not found");
//       return res.status(404);//not found
//     }
//      res.send(user);
//   }).catch((e) => {
//     //console.log("error");
//      res.status(500).send();
//   })
//
// })
//
// app.get('/tasks',(req,res)=>{
//   //find return promises
//   User.find({}).then((tasks)=>{
//      res.send(tasks);
//   }).catch((e) => {
//      res.status(500).send("error");
//   })
//
// })
// // particular user
// //route parameter :
// app.get('/task/:id',(req,res)=>{
//   //find return promises
//   const id=req.params.id;
//   User.findById({id}).then((task)=>{
//     if(!task){
//     //  conole.log("not found");
//       return res.status(404).send("notfound");//not found
//       //return use for stop execution
//     }
//      res.send(task);
//   }).catch((e) => {
//     //console.log("error");
//      res.status(500).send("error");
//   })
//
// })
//
//
// app.post('/users', async (req, res) => {
//     const user = new User(req.body)
//
//     try {
//         await user.save()
//         res.status(201).send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

var ObjectID = require('mongodb').ObjectID;



//using async


app.post('/users/login', async (req, res) => {
    try {
      //User nodule object to access fun
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token= await user.generateToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users/me', auth, async (req, res) => {//auth to call middleware
    res.send(req.user)
})
// app.get('/users',auth, async (req, res) => {// making fun async using keyword async //auth to middleware
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }
    catch (e) {
        res.status(500).send(e)
    }
})
//patch use for update
app.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)// Json to objects array

    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))// checking all updates presesnt in allowedupdates

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        //passing req.body objects
        // req.paramas.id
        //new :true -return new  user

//  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

  //for pre userSchema middleware use 'save'
//    const user=await User.findById(req.params.id)
    updates.forEach((update)=>{
    //dynamic update
       req.user[update]=req.body[update]// put value of json object eg= user.password=req.body[password]
       // grabing update and its property
    })
    await req.user.save();


        res.send(req.user)

    }
    catch (e) {
        res.status(400).send(e)
    }
})
//save
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
      const token= await  user.generateToken();

        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})


// creat taask for user if u r authenticated
app.post('/tasks',auth, async (req, res) => {
  //  const task = new Task(req.body)
      const task=new Task({
        ...req.body, //copying es6 operator
        owner:req.user._id
      })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})



app.get('/tasks/:id',auth ,async (req, res) => {
    //const _id = '5f15f89dce877f19904eca76' // url id

    try {
//     var id = req.params.id;

       //let task = await Task.findOne({  owner: req.user._id  })//to do Authorization

    //  task = await Task.findById({_id: req.params.id })
       const task =await Task.findOne({  owner: req.user._id})
    //     console.log(task)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    }
     catch (e) {
        res.status(500).send()
    }
})





//update task

app.patch('/tasks/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body)// Json to objects array

    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))// checking all updates presesnt in allowedupdates

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        //passing req.body objects
        // req.paramas.id
        //new :true -return new  user


        const task = await Task.findOne({ owner:req.user._id})// to do Authorization

        if (!task) {
            return res.status(404).send()
        }
      const t=  await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(t)

    }
    catch (e) {
        res.status(400).send(e)
    }
})

///delete
app.delete('/tasks/:id',auth, async (req, res) => {
    try {
      let task=await Task.findOne({ owner:req.user._id})

        if (!task) {
            res.status(404).send()
        }
       task = await Task.findByIdAndDelete(req.params.id)
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.delete('/users/me',auth, async (req, res) => {
    try {
      //  const user = await User.findByIdAndDelete(req.use._id)

        // if (!user) {
        //     return res.status(404).send()
        // }
      await Task.deleteMany({owner:req.user._id})// delete all task of this user as well
      await req.user.remove()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


///user
//logout
app.post('/user/logout',auth ,async(req,res)=>{
  try{
      req.user.tokens=req.user.tokens.filter((token)=>{
        return token.token !== req.token;// will filter which is equal
      })
    await req.user.save();
    res.send()
  }
  catch(e){
    res.status(500).send()
  }
})

app.post('/user/logoutall',auth ,async(req,res)=>{
  try{
      req.user.tokens=[]// deleteted all token logout from all devices
    await req.user.save();
    res.send()
  }
  catch(e){
    res.status(500).send()
  }
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
