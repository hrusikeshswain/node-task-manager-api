const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'
const databasebName = 'task_manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true },function(err, client) {
    if (err) {
       return console.log(err);
    }

    console.log('Connected to MongoDB at ');
    const db = client.db(databasebName);

    db.collection('tasks').insertOne({
        name: 'Hrusikesh',
        age: 28
    });
});
    