const express = require('express');
const Tasks = require('../models/task');
const router = new express.Router();
const auth = require('../middleware/auth');


router.post('/tasks', auth, async(req, res)=>{
    console.log(req.body);
    // const task = new Tasks(req.body);

    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
    // task.save().then(()=>{
    //     res.status(201).send(task);
    // }).catch((error)=>{
    //     res.status(400).send(error);
    // });
});
// GET /api/tasks?complete=true&limit=50&skip=0
// limit skip asks?limit=3&skip=3
// GET /api/tasks?sortBy=createdAt_asc desc for descending
// ascending 1 and descending -1
router.get('/tasks',auth,async(req, res)=>{
    const match = {}
    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    if(req.query.completed){
       match.completed = req.query.completed === 'true'; //for convert string to booelan as every query param is a string
    }
    try {
        // const tasks = await Tasks.find({ owner: req.user._id });
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     completed: 1
                //     createdAt: -1
                // }
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks);
    } catch (error) {
        res.status(500).send();
    }
//    Tasks.find({}).then(task => {
//      res.status(200).send(task);
//    }).catch((error)=>{
//     res.status(500).send();
//    });
});

router.get('/tasks/:id',auth,async(req, res)=>{
   const _id = req.params.id;
   try {
    // const task = await Tasks.findById(_id);

    const task =  await Tasks.findOne({ _id, owner: req.user._id });
    if(!task){
       return res.status(404).send();
    }
    res.send(task);
   } catch (error) {
    res.status(500).send();
   }
  
//    Tasks.findById(_id).then((task)=>{
//       if(!task){
//        return res.status(404).send();
//       }
//       res.send(task);
//    }).catch((error)=>{
//       res.status(500).send();
//    });
});


router.patch('/tasks/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdatesArray = ['description', 'completed'];
    const isValidOption = updates.every((update)=>{
         return allowedUpdatesArray.includes(update);
    })
    if(!isValidOption){
        return res.status(404).send({ error: 'Invalid updates!'})
    }
    try {
        
        const task = await Tasks.findOne({ _id:req.params.id , owner:req.user._id })
        //for using middleware
        //  const task = await Tasks.findById(req.params.id)

         updates.forEach((update) => {
            task[update] = req.body[update]
         })

         await task.save()

        // const task = await Tasks.findByIdAndUpdate(req.params.id,req.body, {new: true , runValidators: true});// new gives updated data and run the validator
        if(!task){
            return res.status(404).send()
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/tasks/:id', auth, async(req, res)=>{
    try {
        const task = await Tasks.findOneAndDelete({ _id:req.params.id, owner:req.user._id });
    //  const task = await Tasks.findByIdAndDelete(req.params.id);
     if(!task){
         return res.status(404).send();
     }
     res.send(task);
    } catch (error) {
     res.status(500).send(error);
    }
 })


 module.exports = router;
