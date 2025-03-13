import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './models/user.js';


const app = express();
app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins (or specify your frontend URL)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

mongoose.connect('mongodb+srv://sachin:sachin@cluster0.b1wcb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


app.post('/register', (req, res)=>{
    UserModel.create(req.body).
    then(user => res.json(user))
    .catch(err => res.json(err))
})


app.post('/login', async(req, res)=>{
    const {email} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Success")
        } else{
            res.json("The email does not exist in our database")
        }
    })
})



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
