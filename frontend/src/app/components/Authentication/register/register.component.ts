import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/interface/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authServices: AuthenticationService, private router: Router,
    private toastr: ToastrService, private builder: FormBuilder
  ) {
    this.registerForm = this.builder.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required],
    });
    
  }
  ngOnInit(): void {
    
  }

  register(){
    if(this.registerForm.valid){
      this.authServices.userRegister(this.registerForm.value).subscribe((data: any) => {
        if(data.success){
          this.toastr.success('Registered Successfully');
          this.router.navigateByUrl('/login');
          console.log(data);
        } else {
          this.toastr.warning('Please Enter Valid Data');
        }
      }, (error) => {
        this.toastr.warning('Please Enter a Valid Data');
      })
    } else {
      this.toastr.error('Please Enter a Valid Data');
    }
  }
}
