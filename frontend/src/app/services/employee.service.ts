import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interface/employee';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  //Get All Employees
  allEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.apiUrl}/employees`);
  }

  //Create a Employee
  createEmployee(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${environment.apiUrl}/employee`, data);
  }

  //Get Employee By Id
  getSingleEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${environment.apiUrl}/employee/${id}`);
  }

  //Update Employee
  updateEmployee(data: any): Observable<Employee> {
    return this.http.put<Employee>(
      `${environment.apiUrl}/employee/${data._id}`,
      data
    );
  }

  //Delete Employee
  deleteEmployee(id: string) {
    return this.http.delete<Employee>(
      `${environment.apiUrl}/employee/${id}`
    );
  }
}
