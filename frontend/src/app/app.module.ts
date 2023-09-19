import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AddEmployeeComponent } from './components/Employee/add-employee/add-employee.component';
import { RegisterComponent } from './components/Authentication/register/register.component';
import { LoginComponent } from './components/Authentication/login/login.component';
import { UpdateEmployeeComponent } from './components/Employee/update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './components/Employee/delete-employee/delete-employee.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { DetailEmployeeComponent } from './components/Employee/detail-employee/detail-employee.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddEmployeeComponent,
    RegisterComponent,
    LoginComponent,
    UpdateEmployeeComponent,
    DeleteEmployeeComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    UsersListComponent,
    DetailEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({positionClass: 'toast-top-right'}),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
