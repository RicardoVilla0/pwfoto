// src/app/auth/register/register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth'; // ajusta ruta si es necesario

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  role: 'client' | 'photographer' = 'client';
  acceptTos = false;

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router, private auth: AuthService) {}

  validate(): boolean {
    this.errorMessage = '';
    if (!this.name.trim()) { this.errorMessage = 'Ingresa tu nombre.'; return false; }
    if (!this.email.trim()) { this.errorMessage = 'Ingresa tu correo.'; return false; }
    if (!this.password) { this.errorMessage = 'Ingresa una contraseña.'; return false; }
    if (this.password.length < 6) { this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.'; return false; }
    if (this.password !== this.confirmPassword) { this.errorMessage = 'Las contraseñas no coinciden.'; return false; }
    if (!this.acceptTos) { this.errorMessage = 'Acepta los términos para continuar.'; return false; }
    return true;
  }

  async register(): Promise<void> {
    if (!this.validate()) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const user = await this.auth.register({
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role
      });
      this.successMessage = 'Cuenta creada con éxito — redirigiendo...';
      const target = user.role === 'photographer' ? '/photographer' : '/client';
      setTimeout(() => this.router.navigate([target]), 600);
    } catch (err: any) {
      this.errorMessage = err?.message || 'Error al crear la cuenta';
    } finally {
      this.loading = false;
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
