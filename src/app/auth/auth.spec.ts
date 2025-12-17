// src/app/auth/auth.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthService, User } from './auth';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    // limpiar storage antes de cada test
    try { localStorage.clear(); } catch {}
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('register should create a user and persist it', async () => {
    const payload = { name: 'Test User', email: 'test@example.com', password: '123456', role: 'client' as const };
    const user = await service.register(payload);
    expect(user.email).toBe(payload.email);
    expect(service.isLoggedIn()).toBeTrue();
    const stored = localStorage.getItem('auth_user');
    expect(stored).toBeTruthy();
    const parsed: User = JSON.parse(stored as string);
    expect(parsed.email).toBe(payload.email);
  });

  it('login should set user and persist storage', async () => {
    const user = await service.login('photo@example.com', 'pw', undefined);
    expect(user.email).toContain('@');
    expect(service.isLoggedIn()).toBeTrue();
    expect(service.getUserRole()).toBe('photographer'); // por contain 'photo'
    const stored = localStorage.getItem('auth_user');
    expect(stored).toBeTruthy();
  });

  it('logout should clear user and localStorage', async () => {
    await service.login('a@b.com', 'pw', 'client');
    expect(service.isLoggedIn()).toBeTrue();
    service.logout('/');
    expect(service.isLoggedIn()).toBeFalse();
    expect(localStorage.getItem('auth_user')).toBeNull();
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
  });

  it('restoreFromStorage should set user from storage', async () => {
    // simular storage
    const dummy = { name: 'X', email: 'x@x.com', role: 'client', token: 't' };
    localStorage.setItem('auth_user', JSON.stringify(dummy));
    // crear nuevo servicio para forzar restore
    const svc = TestBed.inject(AuthService);
    svc.restoreFromStorage();
    expect(svc.isLoggedIn()).toBeTrue();
    expect(svc.getCurrentUser()?.email).toBe('x@x.com');
  });
});
