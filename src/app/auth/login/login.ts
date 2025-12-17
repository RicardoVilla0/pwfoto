// src/app/auth/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth'; // ajusta ruta si tu archivo auth.ts está en otra carpeta

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  role: 'client' | 'photographer' = 'client';
  remember = false;
  loading = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) {}

  async login(): Promise<void> {
    this.errorMessage = '';
    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Por favor ingresa correo y contraseña.';
      return;
    }

    this.loading = true;
    try {
      const user = await this.auth.login(this.email, this.password, this.role);
      // opcional: manejar "remember" (por ahora el AuthService persiste siempre)
      // navegar según role
      const target = user.role === 'photographer' ? '/photographer' : '/client';
      await this.router.navigate([target]);
    } catch (err: any) {
      this.errorMessage = err?.message || 'Error al iniciar sesión';
    } finally {
      this.loading = false;
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  forgotPassword(): void {
    window.open('https://www.example.com/forgot-password', '_blank', 'noopener');
  }
}
