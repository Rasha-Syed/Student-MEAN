import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    const mockUsers = [
      { email: 'admin', password: 'admin123' },
    ];

    const user = mockUsers.find(
      (u) => u.email === this.email && u.password === this.password
    );

    if (user) {
      this.router.navigate(['/students']); 
    } else {
      alert('Invalid credentials!');
    }
  }
}
