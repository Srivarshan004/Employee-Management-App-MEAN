import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/interface/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { DeleteEmployeeComponent } from '../Employee/delete-employee/delete-employee.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allEmployees!:Employee[];
  employeesCount!:number;
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'age', 'email', 'jobTitle', 'phoneNumber', 'city', 'hiringDate', 'salary', 'action']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employee:EmployeeService, public dialog: MatDialog,
    private builder:FormBuilder, private router:Router, private toastr:ToastrService){
      
    }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.employee.allEmployees().subscribe((data:any) => {
      this.allEmployees = data.employees;
      this.employeesCount = data.EmployeesCount;
      console.log('Employees Count : ', this.employeesCount);
      console.log(this.allEmployees);
      this.dataSource = new MatTableDataSource(this.allEmployees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteEmployee(id:string){
    const deleteConfirm = this.dialog.open(DeleteEmployeeComponent, {
      width: '50%',
      data: { id }
    })

  deleteConfirm.afterClosed().subscribe((result) => {
    if(result){
        this.allEmployees = this.allEmployees.filter((record) => record._id !== id)
        this.getAllEmployees();
     }
    })
  }

  searchEmployee = this.builder.group({input : this.builder.control('')})

  searchEmp() {
    const searchQuery = this.searchEmployee.value.input;
    console.log('Search Query:', searchQuery);
    if(searchQuery !== ''){
      this.router.navigate(['/employee-detail/', searchQuery]);
    } else {
      this.toastr.warning('Please Enter a Employee Id')
    }
  }
}
