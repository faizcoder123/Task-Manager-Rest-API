const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('../model/task')
// use middle ware -to run codebefore after save for hash password just create schema first;
const userSchema=new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens :[{
      token:{
        type:String,
        required:true
      }
    }]
})
//monggose  to figure out they are connected relationship not store in database
userSchema.virtual('tasks',{// same nameusertasks
  ref:'Task',
  localField: '_id',// local data user id
  foreignField:'owner'  //on task
})

userSchema.methods.toJSON = function () {// res.send call sttrigfy to conver into JSON so I am modifying my return data hiding password
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}


// my function
// await and synch to make promises easy
//static access on model
//methods acces on instance.
userSchema.methods.generateToken= async function(){

   const user=this;
   const token=jwt.sign({_id:user._id.toString()},'thisisproject')
   user.tokens=user.tokens.concat({token});
   await user.save()
   return token;

}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Password doesnt match')
    }

    return user
}

// pre -before post after
//arrow function dont bind this
userSchema.pre('save',async function(next){
  const user=this

  if(user.isModified('password')){  // if password being updated
          user.password=await bcrypt.hash(user.password,8);
  }
  next()//we ar done
})

const User = mongoose.model('User',userSchema)

module.exports=User
