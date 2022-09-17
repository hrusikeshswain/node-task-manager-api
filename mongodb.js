
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient , ObjectID } = require('mongodb')

const id  = new ObjectID()
console.log(id);
console.log(id.id);//binary data
console.log(id.id.length);//lenght of it
console.log(id.toHexString().length);
console.log(id.timestamp());


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client)=>{
    if(error){
        return console.log('unable to connect to MongoClient'+error);
    }

    console.log('connected to MongoClient'+connectionURL);
    const db = client.db(databaseName);

    //delete document from database

    db.collection('tasks').deleteMany({
        age:27
    }).then((result) => {
        console.log('deleted task from database');
    }).catch((err) => {
        console.log('failed to delete task from database');
    });

    db.collection('tasks').deleteOne({
        description:'Task1'
    }).then((result) => {
       console.log('deleted task from database');
    }).catch((err) => {
        console.log('failed to delete task from database');
    })

    //update database

//     const updatePromise = db.collection('users').updateOne({
//         _id:new ObjectID("784rb7rb87fb4i7fn98"),
//     },{
//         // $set: {
//         //     name: 'Mike',
//         // }
//         $inc: {
//             age: 1,
//         }
//     });

// updatePromise.then((result)=>{
//   console.log('updated user '+result.insertedId);
// }).catch((error)=>{
//     console.error(error);
// })

// db.collection('users').updateMany({
//     completed: false
// }, {
//     $set: {
//         completed: true
//     }
// }).then((result)=>{
//    console.log('updated user '+result.insertedId);
// }).catch((error)=>{
//     console.error(error);
// })

    //find

    // db.collection('users').findOne({ name : 'Jen' , age: 1},(error, user)=>{
    //    if(error){
    //     return console.log('unable to find user'+error);
    //    }

    //    console.log(user);
    // });

    // db.collection('users').findOne({ _id : new ObjectID('78hbdiubsaytqeq3e874r48r48') },(error, user)=>{
    //     if(error){
    //      return console.log('unable to find user'+error);
    //     }
 
    //     console.log(user);
    //  });

    //  db.collection('users').find({ age: 27 }).toArray((error, users)=>{
    //    console.log(users);
    //  })

    //  db.collection('users').find({ age: 27 }).count((error, count)=>{
    //     console.log(count);
    //   })


    // db.collection('users').insertOne({
    //     _id:id,
    //     name: 'Jane',
    //     age: 18,
    //   },(error, response)=>{
    //     if(error){
    //        return console.log('unable to connect to MongoClient'+error);
    //     }

    //     console.log('connected to MongoClient'+response.ops);
    //  })

    //  db.collection('users').insertMany([{
    //     name: 'Jane',
    //     age: 18,
    //   },
    //   {
    //     name: 'Vikram',
    //     age: 17,
    //   }],(error, response)=>{
    //     if(error){
    //        return console.log('unable to connect to MongoClient'+error);
    //     }

    //     console.log('connected to MongoClient'+response.ops);
    //  })
})