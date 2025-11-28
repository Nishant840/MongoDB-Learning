const express = require("express")
const mongoose = require("mongoose")

const app = express();
app.use(express.json());

mongoose.connect("");

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

// const User = mongoose.model('Users',{
//         name:String,
//         email:String,
//         password:String
//     });

// app.post('/signUp',async function (req,res){
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     const existingUser = await User.findOne({email:email});
//     if(existingUser){
//         res.status(400).send("User already Exist");
//     } 
//     const user = new User({
//         name:name,
//         email:email,
//         password:password
//     });
//     user.save();
//     res.json({
//         "msg":"User created sucessfully"
//     });
// })

// app.listen(3000);

// defining schema in mongo database
// const userSchema = new mongoose.Schema({
//     email : String,
//     password : String,
//     purchased_courses : [{
//         type:mongoose.Schema.Types.ObjectId,
//         ref : 'Course'
//     }]
// })
// const courseSchema = new mongoose.Schema({
//     title: String,
//     price: 5999
// })
// const User = mongoose.model('User',userSchema);
// const Course = mongoose.model('Course', courseSchema);

// creating db
const userSchema = new mongoose.Schema({
    username : String,
    password : String
})
const User = mongoose.model('User',userSchema);
User.create({
    username: req.body.username,
    password: req.body.password
})
User.findById("1");

// find=>finding multiple entries, findOne=>finding one entries
User.find({
    username: "nishant kumar"
})
User.findOne({
    username: "nishant kumar"
})

User.updateOne(
    { id: "1" },
    { $push: {purchasedCourses: courseId}}
)
User.updateOne(
    {id: "1"},
    {password: "newPassword"}
)
// update each row
User.update({},
    {premium: true}
)
User.deleteMany({})
User.deleteOne(
    {id: "1"}
)
