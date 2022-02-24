import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';




const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
app.use(morgan('short'))
app.use((req, res, next) => {
    console.log("a request came", req.body);
    next()
})

const dbname = 'game-of-thrones';
const url = `mongodb://127.0.0.1:27017/${dbname}`;

// Mongo db connection.
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection
db.once('open', _ => {
    db.collection('users').find({}, { email: 1 }).toArray(function (err, result) {
        if (!err) {

        }
    })
    // Register User api.
    // app.post('/registeruser', (req, res) => {

    //     if (!req.body.name || !req.body.email || !req.body.password) {
    //         res.status(400).send("invalid data");
    //     }
    //     else{
    //         // db.collection('users').find({},{email:req.body.email}).toArray(function(err,result){
    //         //     if (err) throw err;
    //         //     console.log(result);
    //         //     db.close();
    //         // })
    //     }


    // })


});
db.on('error', err => {
    console.error('connection error:', err)
});


// users collection.
const UserModel = mongoose.model('User', {
    name: String,
    email: String,
    isEmailVerified: Boolean,
    password: String,
});




app.get('/', (req, res) => {
    res.send('Mongo db server running...')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})