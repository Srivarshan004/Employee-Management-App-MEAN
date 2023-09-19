import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../interface/auth';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  //User Register
  userRegister(data:Auth):Observable<Auth>{
    return this.http.post<Auth>(`${environment.apiUrl}/register`, data);
  }

  //User Login 
  userLogin(data:Auth):Observable<Auth>{
    return this.http.post<Auth>(`${environment.apiUrl}/login`, data);
  }

  //User Logout
  userLogout(){
    return this.http.delete(`${environment.apiUrl}/logout`);
  }

  getAllUsers():Observable<Auth[]>{
    return this.http.get<Auth[]>(`${environment.apiUrl}/admin/users`);
  }

  getSingleUser(id:string):Observable<Auth>{
    return this.http.get<Auth>(`${environment.apiUrl}/admin/user/${id}`);
  }

  updateUser(id:any, data:any):Observable<Auth>{
    return this.http.put<Auth>(`${environment.apiUrl}/admin/user/${id}`, data);
  }

  deleteUser(id:string):Observable<Auth>{
    return this.http.delete<Auth>(`${environment.apiUrl}/admin/user/${id}`);
  }

}
