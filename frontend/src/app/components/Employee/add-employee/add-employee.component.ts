import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interface/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
  employeeDetail:Employee = {
    _id: '',
    name: '',
    age: '',
    dob: '',
    email: '',
    phoneNumber: '',
    gender: 'male',
    jobTitle: '',
    department: '',
    city: '',
    state: '',
    hiringDate: '',
    bank: '',
    bankAccount: '',
    salary: ''
  }

  constructor(private employeeService:EmployeeService, private router:Router, 
    private toastr:ToastrService){ }

  ngOnInit(): void {
    
  }

  addEmployee() {
    this.employeeService.createEmployee(this.employeeDetail).subscribe(() => {
      this.toastr.success('Employee Added Successfully');
      this.router.navigateByUrl('/dashboard')
    }, () => {
      this.toastr.warning('Please Ener a Valid Data!');
    })
  }

}
