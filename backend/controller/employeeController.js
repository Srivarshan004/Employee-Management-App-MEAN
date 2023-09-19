const catchAsyncError = require('../middlewares/catchAsyncError');
const Employee = require('../models/employeeModel');
const ErrorHandler = require('../utils/errorHandler');

//Create Employee(POST) - http://localhost:4000/api/employee
const createEmployee = catchAsyncError(async (req, res, next) => {
    let newemployee = {
        name: req.body.name,
        age: req.body.age,
        dob: req.body.dob,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        jobTitle: req.body.jobTitle,
        department: req.body.department,
        city: req.body.city,
        state: req.body.state,
        hiringDate: req.body.hiringDate,
        bank: req.body.bank,
        bankAccount: req.body.bankAccount,
        salary: req.body.salary
    };

    const employee = await Employee.create(newemployee);
    res.status(201).json({
        success: true,
        message: 'Employee Created Successfully',
        employee
    });


})

//Get Single Employee Detail(GET) - http://localhost:4000/api/employee/:id
const getSingleEmployee = catchAsyncError(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(new ErrorHandler(`Employee not found in this ${req.params.id}`, 400));
    }

    res.status(201).json({
        success: true,
        employee
    })

})

//Get All Employees Detail(GET) - http://localhost:4000/api/employees
const getEmployees = catchAsyncError(async (req, res, next) => {
    const employees = await Employee.find({});

    const EmployeesCount = await Employee.countDocuments({});

    res.status(200).json({
        success: true,
        EmployeesCount,
        employees
    })
})


//Update Employee Details(PUT) - http://localhost:4000/api/employee/:id
const updateEmployee = catchAsyncError(async (req, res, next) => {

    const employeeId = req.params.id;

    // Check if employee exists
    const existingEmployee = await Employee.findById(employeeId);
    if (!existingEmployee) {
        return next(new ErrorHandler(`Employee not found with this id: ${employeeId}`, 404));
    }

    // Prepare the updated employee data
    const updatedEmployeeData = {
        name: req.body.name || existingEmployee.name,
        age: req.body.age || existingEmployee.age,
        dob: req.body.dob || existingEmployee.dob,
        email: req.body.email || existingEmployee.email,
        phoneNumber: req.body.phoneNumber || existingEmployee.phoneNumber,
        gender: req.body.gender || existingEmployee.gender,
        jobTitle: req.body.jobTitle || existingEmployee.jobTitle,
        department: req.body.department || existingEmployee.department,
        city: req.body.city || existingEmployee.city,
        state: req.body.state || existingEmployee.state,
        hiringDate: req.body.hiringDate || existingEmployee.hiringDate,
        bank: req.body.bank || existingEmployee.bank,
        bankAccount: req.body.bankAccount || existingEmployee.bankAccount,
        salary: req.body.salary || existingEmployee?.salary,
    };

    // Update the employee
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedEmployeeData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: 'Employee Details Updated',
        updatedEmployee,
    });
});

const deleteEmployee = catchAsyncError(async (req, res, next) => {
    let employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(new ErrorHandler(`Employee not found with this id: ${req.params.id}`, 404));
    }

    employee = await Employee.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Employee Detail Deleted'
    })
})

module.exports = { createEmployee, getSingleEmployee, getEmployees, updateEmployee, deleteEmployee }