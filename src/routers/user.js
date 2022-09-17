const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp')
const { sendWelcomeEmail,cancelEmail } = require('../../emails/account') 
const router = new express.Router();

const errorMiddleware = (req, res, next) => {
    throw new Error('Error uploading')
}

const upload = multer({
    // dest: 'images',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
    //   if(!file.originalname.endsWith('.jpg')){
    //     return cb(new Error('File must be jpg'))
    //   }

    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(new Error('File must be jpg'))
    }

      cb(undefined, true)
 
      // cb(new Error('File must be pdf'))
      // cb(undefined, true)
      // cb(undefined, false)
    }
})


router.post('/users', async(req, res) => {
    console.log(req.body);
    // res.send('testing!');
    const user  = new User(req.body);
    try {
        await user.save();
        await sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
          
        res.status(201).send({ user,token });
    } catch (error) {
        res.status(400).send(error);
    }
    

    // user.save().then(()=>{
    //    res.status(201).send(user);
    // }).catch((error)=>{
    //   console.log(error);
    //   res.status(400).send(error);
    // //   res.send(error);
    // });
});

router.post('/users/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user,token });
    } catch (error) {
        res.status(400).send();
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
           return token.token !== req.token  
        })

        await req.user.save()

        res.send()
    } catch (error) {
        res.status(400).send();
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        req.user.tokens = []

        await req.user.save()

        res.send()
    } catch (error) {
        res.status(400).send();
    }
})

//Async Function
router.get('/users/me', auth , async(req, res)=>{
    res.status(200).send(req.user);
    try {
       const users = await User.find({});
       res.status(200).send(users);
    } catch (error) {
        res.status(500).send();
    }
    User.find({}).then((users)=>{
       res.status(200).send(users);
    }).catch((error)=>{
       res.status(500).send(); //500 internal server error
    });
  })


  //Async function

//   router.get('/users/:id',async(req, res)=>{
//     console.log(req.params);
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if(!user){
//             return res.status(404).send();
//         }
//         res.status(200).send(user); 
//     } catch (error) {
//         res.status(500).send();
//     }

//    User.findById(_id).then((user)=>{
//     if(!user){
//         return res.status(404).send();
//     }
//       res.send(user);
//    }).catch((error)=>{
//       res.status(500).send();
//    });
// });


router.patch('/users/me',auth, async(req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdatesArray = ['name', 'email', 'password','age'];
    const isValidOption = updates.every((update)=>{
         return allowedUpdatesArray.includes(update);
    })
    if(!isValidOption){
        return res.status(404).send({ error: 'Invalid updates!'})
    }
    try {
        
        // const user = await User.findById(req.params.id)
        const user = req.user
        
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        
        // const user = await User.findByIdAndUpdate(req.params.id,req.body, {new: true , runValidators: true});// new gives updated data and run the validator
        
        if(!user){
            return res.status(404).send()
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/users/me',auth,async(req, res)=>{
   try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if(!user){
    //     return res.status(404).send();
    // }
    await req.user.remove()
    await cancelEmail(req.user.email, req.user.name)
    res.send(req.user);
   } catch (error) {
    res.status(500).send(error);
   }
})

router.post('/users/profilepic', auth, upload.single('upload'), async (req, res) => {
    
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.profilepic = buffer
    await req.user.save()
    try {
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
},(error, req, res, next) => {
    res.status(400).send({ error: error.message})
})

router.delete('/users/profilepic', auth, async (req, res) => {
    req.user.profilepic = undefined
    await req.user.save()
    try {
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id/profilepic', async (req, res) => {
    
    try {
        const  user = await User.findById(req.params.id)

        if(!user || !user.profilepic){
             res.status(404).send({ error: 'User not found'})
        }

        //set header fields
        // res.set('Content-Type', 'application/json') bydefault;

        res.set('Content-Type', 'image/png');
        res.send(user.profilepic)

    } catch (error) {
        res.status(404).send(error)
    }

})


module.exports = router;