// src/app/pages/contact/contact/contact.ts
import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  submitted = false;
  submitting = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Desplaza y enfoca la sección de información de contacto.
   * (Usado por tests y por navegación desde enlaces)
   */
  scrollToContactInfo(): void {
    const el = this.document.getElementById('contact-info');
    if (el) {
      // desplazamiento suave y enfocar para accesibilidad
      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch {
        // fallback si el navegador no soporta opciones
        el.scrollIntoView();
      }
      // enfocar (esto es lo que testea el spec)
      try {
        (el as HTMLElement).focus();
      } catch {
        // ignore si focus falla en entorno no-DOM
      }
    }
  }

  /**
   * Maneja el submit del formulario.
   * El template previene el default, pero recibimos el evento por si acaso.
   */
  onSubmit(event: Event): void {
    this.submitting = true;
    try {
      const form = event.target as HTMLFormElement | null;
      let data: Record<string, any> = {};
      if (form instanceof HTMLFormElement) {
        const fd = new FormData(form);
        data = Object.fromEntries(fd.entries());
        // reset del formulario visualmente
        form.reset();
      }
      // Simulación de envío: aquí conectarías con tu API
      console.log('Contacto enviado:', data);
      // indicador simple de éxito
      this.submitted = true;
    } catch (err) {
      console.error('Error al procesar el formulario de contacto', err);
    } finally {
      this.submitting = false;
      // opcional: desplazar a la info de contacto después de enviar
      setTimeout(() => this.scrollToContactInfo(), 300);
    }
  }
}
