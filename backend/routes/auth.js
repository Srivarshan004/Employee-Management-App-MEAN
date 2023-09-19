const express = require('express');
const path = require('path');

const { 
    userRegister, 
    userLogin, 
    userLogout,
    getAllUsers,
    getSpecificUser,
    updateUser,
    deleteUser
} = require('../controller/authController');
const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/logout').get(userLogout);

//Admin Routes
router.route('/admin/users').get( getAllUsers);
router.route('/admin/user/:id').get( getSpecificUser);
router.route('/admin/user/:id').put( updateUser);
router.route('/admin/user/:id').delete( deleteUser);



module.exports = router;