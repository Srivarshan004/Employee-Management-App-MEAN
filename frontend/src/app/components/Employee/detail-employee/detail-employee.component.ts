import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/interface/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit{
  employee!:Employee

  constructor(private employeeService:EmployeeService, private route:ActivatedRoute,
    private router:Router, private toastr:ToastrService){ }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = String(params.get('id'))
      this.getEmployeeDetail(id);
    })
    
  }


  getEmployeeDetail(id: string) {
    this.employeeService.getSingleEmployee(id).subscribe(
      (data: any) => {
        this.employee = data.employee;
      },
      () => {
        this.router.navigate(['/dashboard'])
        this.toastr.error(`Employee Not Found this Id ${id}`)
      }
    );
  }
  
  
}
