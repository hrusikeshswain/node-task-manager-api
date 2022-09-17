const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  //express middleware
// app.use((req, res, next)=>{
//    console.log(req.method, req.path)
//    if(req.method === 'GET'){
//       res.send('GET request are disabled for this application')
//    }else{
//       next();
//    } 
// })

// app.use((req, res, next)=>{
//     res.status(503).send('Site is under maintainance')
// })

try {
    console.log(req.header('Authorization'))
    const token = req.header('Authorization').replace('Bearer ','')
    console.log(token)
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    const user  = await User.findOne( { _id:decoded._id , 'tokens.token': token } )

    if(!user){
       throw new Error()
    }
    req.token = token
    req.user = user
    next()

} catch (error) {
    res.status(400).send({error: ' Please authenticate. '})
}

}

module.exports = auth