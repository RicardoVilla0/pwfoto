// src/app/client-panel/dashboard/dashboard.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

type BookingStatus = 'Pendiente' | 'Confirmado' | 'Completado' | 'Cancelado';

interface Booking {
  id: string;
  photographer: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  type: string;
  price: number;
  status: BookingStatus;
}

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class ClientDashboardComponent {
  // resumen del cliente (datos simulados)
  summary = {
    proximas: 2,   // <- renombrado sin acento
    gastado: 8600,
    pendientes: 1
  };

  // reservas simuladas del cliente
  bookings: Booking[] = [
    { id: 'C-2001', photographer: 'María Ruiz', date: '2025-12-03', time: '10:00', type: 'Retrato', price: 1200, status: 'Confirmado' },
    { id: 'C-2002', photographer: 'Estudio Central', date: '2025-12-15', time: '16:30', type: 'Familia', price: 2000, status: 'Pendiente' },
    { id: 'C-2003', photographer: 'Carlos Vélez', date: '2025-10-12', time: '09:00', type: 'Producto', price: 5400, status: 'Completado' }
  ];

  selectedBookingId: string | null = null;

  constructor(private router: Router) {}

  // ver detalle de reserva -> navegamos a la página de reserva (simulado)
  viewBooking(id: string) {
    this.selectedBookingId = id;
    // navegación por si tienes una ruta de detalle
    try {
      this.router.navigate(['/booking', id]);
    } catch {
      // ignore en entornos de test
    }
  }

  // cancelar reserva (simulación)
  cancelBooking(id: string) {
    const idx = this.bookings.findIndex(b => b.id === id);
    if (idx >= 0) {
      this.bookings[idx].status = 'Cancelado';
    }
  }

  // reservar nueva sesión -> ir a página de reservación
  newBooking() {
    try {
      this.router.navigate(['/packages']);
    } catch {}
  }

  // cerrar sesión simple
  logout() {
    try { localStorage.removeItem('isLoggedIn'); localStorage.removeItem('userRole'); } catch {}
    this.router.navigate(['/']);
  }
}
