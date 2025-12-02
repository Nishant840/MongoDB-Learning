const express = require("express");
const userMiddleware = require("../middleware/user");
const {Admin, User, Course} = require("../db/index")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

const router = express.Router();

router.post("/signup", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username,
        password
    })
    res.json({
        msg: "User created successfully"
    })
})

router.post("/signin", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    });
    if(user){
        const token = jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token
        })
    }
    else{
        res.status(411).json({
            "msg": "Wrong email and password"
        })
    }
})

router.get("/courses", async (req,res)=>{
    const response = await Course.find({});
    res.json({
        courses: response
    })
})

router.post("/courses/:courseId", userMiddleware, async (req,res)=>{
    const courseId = req.params.courseId;
    const username = req.username;
    try{
        await User.updateOne({
            username:username
        },{
            $push: {purchasedCourses: courseId}
        })
    }
    catch(e){
        console.log(e);
    };
    res.json({
        message: "Purchase complete!"
    })
})

router.get("/purchasedCourses", userMiddleware, async (req,res)=>{
    const user = await User.findOne({
        username:req.username
    });
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });
    res.json({
        courses: courses
    });
})

module.exports = router