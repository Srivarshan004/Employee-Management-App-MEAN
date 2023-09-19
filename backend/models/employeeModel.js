const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter a Name"]
    },
    age: {
        type: String,
        required : [true, "Please Enter Age"]
    },
    dob: {
        type: String,
        required : [true, "Please Enter Date of Birth"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please Enter a Email"],
        validate: [validator.isEmail, "Please Enter a valid Email"],
        lowercase: true
    },
    phoneNumber: {
        type:String,
        unique: true,
        required: [true, "Please Enter a Phone number"]
    },
    gender: {
        type:String,
        required: [true, "Please Enter a Gender"],
        lowercase: true
    },
    jobTitle: {
        type:String,
        required: [true, "Please Enter a Job title"],
        lowercase: true
    },
    department: {
        type:String,
        required: [true, "Please Enter a Job Department"],
        lowercase: true
    },
    city: {
        type: String,
        required: [true, "Please Enter a City"],
        lowercase: true
    },
    state: {
        type: String,
        required: [true, "Please Enter a State"],
        lowercase: true
    },
    salary: {
        type: String,
        required: [true, "Please Enter Salary"]
    },
    hiringDate: {
        type: String,
        required:  [true, "Please Enter Employee Hiring Date"]
    },
    bank: {
        type: String,
        required:  [true, "Please Enter Employee Bank Name"]
    },
    bankAccount: {
        type: String,
        required:  [true, "Please Enter Employee Bank Account Number"]
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
}) 


let model = mongoose.model('Employee', employeeSchema);

module.exports =  model;