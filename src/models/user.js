const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const Tasks = require('./task');

const userSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
       trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email value provided');
            }
        }
    },
    age: {
       type: Number,
       default: 0,
       validate(value) {
         if(value < 0) {
            throw new Error('Invalid age value');
         }
       }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7, //custom validators method
        validator(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Invalid password value should not include password');
            }
    },
    
},
tokens: [{
    token: {
        type: String,
        required: true,
    }
}],
profilepic:{
    type: Buffer
}
},{
    timestamps: true
})
 // not stored in the database its a relationship between two entities
//  ref can be find from module expoer model folder
//  name for virtual field, object for configure individual fields
userSchema.virtual('tasks',{
   ref: 'Tasks',
   localField:'_id',
   foreignField:'owner',
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.profilepic

    return userObject
}

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jsonwebtoken.sign({ _id: user._id.toString() },process.env.JWT_SECRET)

    // user.tokens = user.tokens.push({ token })
    user.tokens = user.tokens.concat({ token })

    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Invalid password');
    }

    return user;
}

//Hash plain text password before sending it to the server
userSchema.pre('save', async function(next){
   const user = this;
   console.log('just before saving user schema');

   if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
   }

   next();
});

//Delete the user 
userSchema.pre('remove', async function(next) {
    const user = this
    await Tasks.deleteMany({  owner: user._id})
    next()
})

//Boolean,dates,arrays,binary data types supported
const User = mongoose.model('User', userSchema);

module.exports = User;