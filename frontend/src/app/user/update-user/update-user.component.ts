import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  editData:any;

  constructor(private builder:FormBuilder, private authService:AuthenticationService, 
    private toastr:ToastrService, private dialog: MatDialogRef<UpdateUserComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any){ }

  updateForm = this.builder.group({
    _id: this.builder.control(''),
    name: this.builder.control(''),
    email: this.builder.control(''),
    role: this.builder.control('User')
  })

  ngOnInit(): void {
    if(this.data.usercode!=null && this.data.usercode!=''){
      console.log('usercode : ', this.data.usercode)
      this.authService.getSingleUser(this.data.usercode).subscribe((data:any) => {
        this.editData = data.user;
        console.log(this.editData)
        this.updateForm.setValue({_id:this.editData._id, name:this.editData.name, 
        email:this.editData.email, role:this.editData.role})
      })
    }
  }

  updateUser(){
    if(this.updateForm.valid){
      this.authService.updateUser(this.updateForm.value._id, this.updateForm.value).subscribe((data) => {
        this.toastr.success('Updated Successfully');
        this.dialog.close();
      })
    } else {
      this.toastr.warning('Please Select a Role')
    }
  }
}
