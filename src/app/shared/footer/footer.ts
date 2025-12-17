// src/app/shared/footer/footer.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  // Abre la página principal de la red social en nueva pestaña
  openSocial(site: 'instagram' | 'facebook' | 'whatsapp'): void {
    let url = '';
    switch (site) {
      case 'instagram':
        url = 'https://www.instagram.com/';
        break;
      case 'facebook':
        url = 'https://www.facebook.com/';
        break;
      case 'whatsapp':
        url = 'https://www.whatsapp.com/';
        break;
    }
    window.open(url, '_blank', 'noopener');
  }

  // Método por si quieres abrir correo desde el botón (usa mailto)
  openEmail(): void {
    const email = 'contacto@estudio.com';
    window.location.href = `mailto:${email}`;
  }
}
