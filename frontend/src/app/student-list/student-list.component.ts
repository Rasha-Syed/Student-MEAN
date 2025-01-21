import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  students: any[] = [];
  filteredStudents: any[] = []; 
  searchTerm: string = ''; 
  studentService = inject(StudentService);
  router = inject(Router);

  constructor() {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      this.filteredStudents = data; 
    });
  }

  searchStudents() {
    const term = this.searchTerm.toLowerCase();
    this.filteredStudents = this.students.filter(
      (student) =>
        student.name.toLowerCase().includes(term) ||
        student.studentId.toLowerCase().includes(term)
    );
  }

  deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.getStudents();
      });
    }
  }

  editStudent(id: string) {
    this.router.navigate(['/edit', id]);
  }

  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/']);
  }
}
