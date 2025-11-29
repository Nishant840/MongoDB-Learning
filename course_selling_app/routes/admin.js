const express = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db/index")

const router = express.Router();

router.post("/signup", async (req,res)=> {
    const username = req.body.username;
    const password = req.body.password;

    // check if a user with this username already exist
    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        msg: "Admin created sucessfully"
    })
})

router.post("/courses", adminMiddleware,async (req,res)=> {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        message: "Course created successfully",
        courseId: newCourse._id
    })
})

router.get("/courses", adminMiddleware, async (req,res)=>{
    const allCourses = await Course.find({});
    res.json({
        courses: allCourses
    })
})

module.exports = router;
