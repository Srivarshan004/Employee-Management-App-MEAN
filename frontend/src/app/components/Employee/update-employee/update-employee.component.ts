import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  
  editData:any;

  constructor(private employeeService:EmployeeService, private route:ActivatedRoute,
  private router:Router, private builder:FormBuilder, private toastr:ToastrService){ }

  employeeDetail = this.builder.group({
    _id: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    age: this.builder.control('', Validators.required),
    dob: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phoneNumber: this.builder.control('', Validators.required),
    gender: this.builder.control(''),
    jobTitle: this.builder.control('', Validators.required),
    department: this.builder.control(''),
    city: this.builder.control('', Validators.required),
    state: this.builder.control('', Validators.required),
    hiringDate: this.builder.control('', Validators.required),
    bank: this.builder.control('', Validators.required),
    bankAccount: this.builder.control('', Validators.required),
    salary: this.builder.control('', Validators.required)
  })

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = String(params.get('id'))

      this.employeeService.getSingleEmployee(id).subscribe((data:any) => {
        this.editData = data.employee
        console.log(this.editData);
        this.employeeDetail.setValue({_id:this.editData._id, name: this.editData.name, email: this.editData.email,
        age : this.editData.age, dob: this.editData.dob, hiringDate: this.editData.hiringDate, bank: this.editData.bank,
        phoneNumber: this.editData.phoneNumber, gender: this.editData.gender, jobTitle:  this.editData.jobTitle,
        department: this.editData.department, city: this.editData.city, state: this.editData.state,
        bankAccount: this.editData.bankAccount, salary: this.editData.salary})
      })
    })

    
  }
  updateEmployee() {
    this.employeeService.updateEmployee(this.employeeDetail.value).subscribe(() => {
      this.toastr.success('Updated Successfully');
      this.router.navigate(['/dashboard']);
    });
  }

  enableSubmitBtn(){
    return this.employeeDetail.valid;
  }
  
}
