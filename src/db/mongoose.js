// Using Node.js `require()`
const mongoose = require('mongoose');
// const validator = require('validator');
//difference is provide database name
// const connectionURL = '';

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

//gives error as name is required
// const meerror = new User({
// });

//gives error as age validation is required
// const meerror = new User({
    // name: 'Mike',
    // age: -1
// });

//get error message for email validation using validator npm package
// const me = new User({
//     name: 'Mike',
//     email: 'mike@example',
// });

// spaces removed and age value is zero
// const me = new User({
//     name: '  John  ',
//     email: 'john@example  '
    
// });

// const me = new User({
//     name: 'John',
//     email: 'john@example.com',
//     password: 'phone@98!',
//     age: 28
// });

// me.save().then(()=>{
//   console.log(me);
// }).catch((err)=>{
//     console.error(err);
// });
 

// const tasks = new Tasks({
//     description: 'Demo description   ',
//     completed: true,
// })

// tasks.save().then(()=>{
//   console.log('Saved', tasks);
// }).catch((error)=>{
//     console.error(error);
// });

//Middleware before or after user is saved
