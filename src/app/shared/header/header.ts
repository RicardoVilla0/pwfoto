// src/app/shared/header/header.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, User } from '../../auth/auth'; // ajusta la ruta si tu auth.ts está en otra ruta

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent {
  isMenuOpen = false;
  isScrolled = false;

  // Exponemos el observable de usuario para usar async pipe en la plantilla
  user$: Observable<User | null>;

  constructor(private router: Router, private auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = offset > 10;
  }

  // Logout -> delega en el AuthService y navega a home
  logout(): void {
    this.auth.logout('/');
    this.closeMenu();
  }

  // Navegar al panel según rol (cliente o photographer)
  goToProfile(user: User | null): void {
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    const role = user.role ?? 'client';
    if (role === 'photographer') {
      this.router.navigate(['/photographer']);
    } else {
      this.router.navigate(['/client']);
    }
    this.closeMenu();
  }
}
