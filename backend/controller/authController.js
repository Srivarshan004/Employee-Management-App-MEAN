//Authenticate Controller
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const ErrorHandlor = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');

//User Register - /api/v1/register
const userRegister = catchAsyncError( async(req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password
    });

    sendToken(user, 201, res);

    /*const token = user.getJwtToken();
    res.status(201).json({
        success : true,
        user,
        token
    });*/
})

//User Login - /api/v1/login
const userLogin = catchAsyncError( async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandlor('Please enter email & password'))
    }

    //find the user database
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandlor('Invalid email or password', 401));
    }

    if(!await user.isValidPassword(password)){
        return next(new ErrorHandlor('Invalid email or password', 401));
    }

    sendToken(user, 201, res);

})

//User Logout - /api/v1/logout
const userLogout = (req, res,  next) => {
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly : true
    }).status(200).json({
        success : true,
        message : "Logged Out"
    })
}


//Admin: Get All Users - /api/v1/admin/users
const  getAllUsers = catchAsyncError( async (req, res, next) => {
    const users = await User.find();

    const UsersCount = await User.countDocuments({});

    res.status(200).json({
        success : true,
        UsersCount, 
        users
    })
})

//Admin: Get Specific User - /api/v1/admin/user/:id
const getSpecificUser = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandlor(`user not found with this id : ${req.params.id}`));
    }

    res.status(200).json({
        success : true,
        user
    })
})

//Admin: Update User - /api/v1/admin/user/:id
const updateUser = catchAsyncError( async (req, res, next) => {
    const newUserData = {
        role : req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new : true,
        runValidators : true
    });

    res.status(200).json({
        success : true,
        user
    })
})

//Admin: Delete User - /api/v1/admin/user/:id
const deleteUser = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandlor(`user not found with this id : ${req.params.id}`));
    }

    await user.deleteOne();


    res.status(200).json({
        success : true,
        DeletedUser : req.params.id
    })
})

module.exports = { 
    userRegister, 
    userLogin, 
    userLogout, 
    getAllUsers,
    getSpecificUser,
    updateUser,
    deleteUser
};