const express = require("express")
const mongoose = require("mongoose")

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://nishant7896545_db_user:WGvxTwReNVGjw4yY@cluster0.ohlk6k2.mongodb.net/userappnew");

// const User = mongoose.model('Users',{
//     name:String,
//     email:String,
//     password:String
// });
// const user = new User({
//     name:"Nishant Kumar",
//     email:"nishant7896545@gmail.com",
//     password:"123456"
// });
// user.save();

// making endpoints

const User = mongoose.model('Users',{
        name:String,
        email:String,
        password:String
    });

app.post('/signUp',async function (req,res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({email:email});
    if(existingUser){
        res.status(400).send("User already Exist");
    } 
    const user = new User({
        name:name,
        email:email,
        password:password
    });
    user.save();
    res.json({
        "msg":"User created sucessfully"
    });
})

app.listen(3000);