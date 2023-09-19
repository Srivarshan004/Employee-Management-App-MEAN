import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>, 
    private authService:AuthenticationService, 
    @Inject(MAT_DIALOG_DATA) public data:any){}
  
    ngOnInit(): void {
      
    }
  
    confirmDelete(){
      this.authService.deleteUser(this.data.usercode).subscribe(() => {
        this.dialogRef.close(this.data.usercode)
      })
    }


}
