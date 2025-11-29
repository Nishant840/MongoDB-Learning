const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://nishant7896545_db_user:Nishant1234kumar@cluster0.ohlk6k2.mongodb.net/course_selling_app");

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imagelink: String,
    price: Number
});

const Admin = mongoose.model('Admin',AdminSchema);
const User = mongoose.model('User',UserSchema);
const Course = mongoose.model('Course',CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}