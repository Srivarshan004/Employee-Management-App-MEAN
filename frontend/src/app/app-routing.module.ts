import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEmployeeComponent } from './components/Employee/add-employee/add-employee.component';
import { RegisterComponent } from './components/Authentication/register/register.component';
import { LoginComponent } from './components/Authentication/login/login.component';
import { UpdateEmployeeComponent } from './components/Employee/update-employee/update-employee.component';
import { authGuard } from './guard/auth.guard';
import { UsersListComponent } from './user/users-list/users-list.component';
import { DetailEmployeeComponent } from './components/Employee/detail-employee/detail-employee.component';

const routes: Routes = [
  { path:'', component:LoginComponent},
  { path:'dashboard', 
    canActivate:[authGuard], 
    data: { roles: ['admin', 'user'] }, 
    component:DashboardComponent
  },
  { path:'addemployee', 
    canActivate:[authGuard], 
    data: { roles: ['admin'] }, 
    component:AddEmployeeComponent 
  },
  { path:'update-employee/:id', 
    canActivate:[authGuard], 
    data: { roles: ['admin'] }, 
    component:UpdateEmployeeComponent
  },{
    path:'employee-detail/:id',
    component:DetailEmployeeComponent
  },
  { path:'register', component:RegisterComponent},
  { path:'login', component:LoginComponent},
  { path:'user', 
    canActivate:[authGuard], 
    data: { roles: ['admin'] }, 
    component:UsersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
