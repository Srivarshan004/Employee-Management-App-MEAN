import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authServices: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {
    localStorage.clear();
    this.loginForm = this.builder.group({
      _id: [''],
      name: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
    }); 
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.authServices.userLogin(this.loginForm.value).subscribe(
        (data: any) => {
          if (data.success) {
            this.toastr.success('Login Successfully');
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);
            localStorage.setItem('username', data.user.name);
            this.router.navigateByUrl('/dashboard');
          } else {
            this.toastr.warning('Invalid Email or Password');
          }
        },
        (error) => {
          console.error('Error during login:', error);
          this.toastr.warning('Invalid Email or Password');
        }
      );
    } else {
      this.toastr.error('Please Enter a Valid Data');
    }
  }
}
