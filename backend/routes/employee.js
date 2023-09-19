const express = require('express');
const router = express.Router();

const { createEmployee, getSingleEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controller/employeeController');

router.route('/employee').post(createEmployee);
router.route('/employee/:id').get(getSingleEmployee);
router.route('/employees').get(getEmployees);
router.route('/employee/:id').put(updateEmployee);
router.route('/employee/:id').delete( deleteEmployee);



module.exports =  router;