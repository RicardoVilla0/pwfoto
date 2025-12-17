// src/app/auth/auth.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export type UserRole = 'client' | 'photographer';

export interface User {
  name?: string;
  email: string;
  role: UserRole;
  token?: string; // si luego usas JWT u otra cosa
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  // Exponer observable para subscribirse desde componentes
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private router: Router) {
    // Al iniciar, intentamos restaurar usuario desde localStorage
    this.restoreFromStorage();
  }

  /**
   * Simula login (reemplaza por llamada HttpClient a tu API).
   * Devuelve una Promise que resuelve con el usuario.
   */
  async login(email: string, password: string, roleHint?: UserRole): Promise<User> {
    // Validación básica (en producción enviar al backend)
    if (!email || !password) {
      return Promise.reject(new Error('Email y contraseña son requeridos'));
    }

    // Simulación: si el email contiene "photo" o roleHint indica photographer, lo tratamos como fotógrafo
    const isPhotographer = roleHint === 'photographer' || /photo/i.test(email);

    const user: User = {
      name: email.split('@')[0],
      email,
      role: isPhotographer ? 'photographer' : 'client',
      token: 'fake-token-' + Math.random().toString(36).slice(2)
    };

    // Persistir (simulación)
    try {
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', '1');
    } catch {
      // ignore en entornos de test / sin storage
    }

    // Actualizar sujeto
    this.userSubject.next(user);

    // Simular latencia mínima (pero sin setTimeout para tests más sencillos)
    return Promise.resolve(user);
  }

  /**
   * Simula registro (reemplaza por llamada real).
   * Registra el usuario y lo deja logueado.
   */
  async register(payload: { name: string; email: string; password: string; role: UserRole }): Promise<User> {
    if (!payload.name || !payload.email || !payload.password) {
      return Promise.reject(new Error('Faltan campos'));
    }

    const user: User = {
      name: payload.name,
      email: payload.email,
      role: payload.role,
      token: 'fake-token-' + Math.random().toString(36).slice(2)
    };

    try {
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', '1');
    } catch {}

    this.userSubject.next(user);
    return Promise.resolve(user);
  }

  /**
   * Cierra sesión localmente.
   */
  logout(navigateTo: string = '/'): void {
    this.userSubject.next(null);
    try {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('isLoggedIn');
    } catch {}
    // Navegar a la página de inicio por defecto
    try {
      this.router.navigate([navigateTo]);
    } catch {
      // ignore si router no funciona en test environment
    }
  }

  /**
   * Obtiene el usuario actual (valor sincrónico)
   */
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  /**
   * Devuelve true/false si hay sesión.
   */
  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  /**
   * Devuelve el rol del usuario si existe
   */
  getUserRole(): UserRole | null {
    return this.userSubject.value ? this.userSubject.value.role : null;
  }

  /**
   * Rehidrata estado desde localStorage (si existe)
   */
  restoreFromStorage(): void {
    try {
      const raw = localStorage.getItem('auth_user');
      if (raw) {
        const u: User = JSON.parse(raw);
        // seguridad mínima: validar estructura
        if (u && u.email) {
          this.userSubject.next(u);
          return;
        }
      }
    } catch {
      // ignore
    }
    this.userSubject.next(null);
  }
}
