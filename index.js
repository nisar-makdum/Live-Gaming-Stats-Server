/*
 * Name: Nisar Makdum.
 * Date: 25 September 2021.
*/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectID
const app = express()
app.use(cors())
app.use(bodyParser.json())


const port = 5000


require('dotenv').config()

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eax0o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    const gamingStatsCollection = client.db("gamingStats").collection("gamesInfo");

    const participantsCollection = client.db("gamingStats").collection("participantsInfo");


    console.log('database Connected');


    app.post('/gamesInfo', (req, res) => {
        const gamesInfo = req.body
        console.log('games infos details', gamesInfo)
        gamingStatsCollection.insertMany(gamesInfo)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/gamesDetails', (req, res) => {
        gamingStatsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })

    })

    app.post('/participantsInfo', (req, res) => {
        const participantsInfo = req.body
        console.log('participants details', participantsInfo)
        participantsCollection.insertMany(participantsInfo)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })


    app.get('/participantsDetails', (req, res) => {
        participantsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })

    })


});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port)