import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class StudentFormComponent implements OnInit {
  studentForm: any;
  studentService = inject(StudentService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  studentId: string | null = null;
  availableSubjects = ['Math', 'Science', 'History', 'English', 'Chemistry'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      studentId: ['', [Validators.required]], 
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      favoriteSubjects: this.fb.array([]),
      image: ['']
    });

    this.studentId = this.route.snapshot.paramMap.get('id');

    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe(
        (data) => {
          this.studentForm.patchValue({
            studentId: data.studentId, 
            name: data.name,
            phone: data.phone,
            email: data.email,
            department: data.department,
            image: data.image,
          });

          this.studentForm.get('studentId').disable();

          const favoriteSubjects = this.studentForm.get('favoriteSubjects') as FormArray;
          if (data.favoriteSubjects) {
            data.favoriteSubjects.forEach((subject: string) =>
              favoriteSubjects.push(this.fb.control(subject))
            );
          }
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
    }
  }

  onSubjectChange(subject: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const favoriteSubjects = this.studentForm.get('favoriteSubjects') as FormArray;

    if (isChecked) {
      favoriteSubjects.push(this.fb.control(subject));
    } else {
      const index = favoriteSubjects.value.indexOf(subject);
      if (index !== -1) {
        favoriteSubjects.removeAt(index);
      }
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formData = {
        ...this.studentForm.getRawValue(), 
        favoriteSubjects: this.studentForm.value.favoriteSubjects,
      };

      if (this.studentId) {
        this.studentService.updateStudent(this.studentId, formData).subscribe({
          next: () => {
            this.router.navigate(['/students']);
          },
          error: (error) => {
            console.error('Error during update request:', error);
          }
        });
      } else {
        this.studentService.addStudent(formData).subscribe({
          next: () => {
            this.router.navigate(['/students']);
          },
          error: (error) => {
            console.error('Error during add request:', error);
          }
        });
      }
    }
  }
}
