const express = require('express');
require('./db/mongoose');
const User = require('./models/user'); 
const Tasks = require('./models/task');
const userRouter = require('./routers/user');
const tasksRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

const multer = require('multer');
const upload = multer({
    dest: 'images'
})

const errorMiddleware = (req, res, next) => {
    throw new Error('Error uploading')
}

app.post('/upload', errorMiddleware,upload.single('upload'), (req, res) => {
   res.send()
})


app.use(express.json());
app.use(userRouter);
app.use(tasksRouter);

app.listen(port,()=>{
    console.log('listening on port '+port);
});







const main = async () => {
    // const task = await Tasks.findById('63252a3d2c597533a9b06379');
    // go now find the task and populate all profile informations
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    // const user  = await User.findById('6325273a6568f231b5b6c1bd');
    // go now find the user and populate all tasks created by the user
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
}
main()
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const pet = {
//     name: 'hall'
// }

// pet.toJSON = function(){
//     console.log(this)
//     return {}
// }

// console.log(JSON.stringify(pet))

const myFunction = async() =>{
    
    // const token = jwt.sign({ _id: 'abc123' }, 'thisismycourse', { expiresIn: '7 days'})
    // console.log(token);

    // const data = jwt.verify(token, 'thisismycourse')
    // console.log(data);
}

// const myFunction = async ()=> {
//    const password = "Red12345!";
//    const hashedPassword = await bcryptjs.hash(password, 8);
//    console.log(password);
//    console.log(hashedPassword);

//    const isMatch = await bcryptjs.compare("red12345!", hashedPassword);
//    console.log(isMatch);
// }

myFunction();

// const router = new express.Router();

// router.get('/test',(req, res)=>{
//     res.send('This is from my other router');
// })

// app.use(router);

// app.post('/users', (req, res) => {
//     console.log(req.body);
//     // res.send('testing!');
//     const user  = new User(req.body);

//     user.save().then(()=>{
//        res.status(201).send(user);
//     }).catch((error)=>{
//       console.log(error);
//       res.status(400).send(error);
//     //   res.send(error);
//     });
// });

//Async function


// app.get('/users',(req, res)=>{
//   User.find({}).then((users)=>{
//      res.status(200).send(users);
//   }).catch((error)=>{
//      res.status(500).send(); //500 internal server error
//   });
// })



// app.get('/users/:id',(req, res)=>{
//     console.log(req.params);
//     const _id = req.params.id;

//    User.findById(_id).then((user)=>{
//     if(!user){
//         return res.status(404).send();
//     }
//       res.send(user);
//    }).catch((error)=>{
//       res.status(500).send();
//    });
// });


// app.post('/tasks',(req, res)=>{
//     console.log(req.body);
//     const task = new Tasks(req.body);
//     task.save().then(()=>{
//         res.status(201).send(task);
//     }).catch((error)=>{
//         res.status(400).send(error);
//     });
// });

//Async function

