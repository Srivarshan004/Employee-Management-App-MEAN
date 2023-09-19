import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEmployeeComponent>, 
  private employeeService:EmployeeService, @Inject(MAT_DIALOG_DATA) public data:any){}

  ngOnInit(): void {
    
  }

  confirmDelete(){
    this.employeeService.deleteEmployee(this.data.id).subscribe(() => {
      this.dialogRef.close(this.data.id)
    })
  }

}
