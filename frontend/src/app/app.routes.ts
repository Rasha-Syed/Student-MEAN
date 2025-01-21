import { Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'students', component: StudentListComponent }, 
  { path: 'students/:id', component: StudentListComponent }, 
  { path: 'add', component: StudentFormComponent }, 
  { path: 'edit/:id', component: StudentFormComponent }, 
];


