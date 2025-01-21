import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], 
  template: `
    <header>
      <h1>Student Management System</h1>
    </header>
    <router-outlet></router-outlet>
    <footer>
      <p>© 2025 Student Management System</p>
    </footer>
  `,
  styles: [
    `.page-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .content-wrap {
        flex: 1; 
        padding: 1rem; 
        box-sizing: border-box; 
      }

      header {
        background-color: #6a0dad; 
        color: white;
        text-align: center;
        padding: 1rem;
        font-size: 1.5rem;
      }

      footer {
        background-color: #6a0dad;
        color: white;
        text-align: center;
        padding: 0.5rem;
        font-size: 1rem;
        margin-top: auto;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  title = 'Student Management System';
  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }
}
