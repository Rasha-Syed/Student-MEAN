import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getStudentById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, student);
  }

  updateStudent(id: string, student: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, student);
  }

  searchStudents(query: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/students/search?query=${query}`);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
