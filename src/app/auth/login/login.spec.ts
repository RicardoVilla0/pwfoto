// src/app/auth/login/login.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('LoginComponent (standalone)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have form inputs in template', () => {
    const email = fixture.debugElement.query(By.css('input[type="email"]'));
    const pass = fixture.debugElement.query(By.css('input[type="password"]'));
    const select = fixture.debugElement.query(By.css('select[name="role"]'));
    expect(email).toBeTruthy();
    expect(pass).toBeTruthy();
    expect(select).toBeTruthy();
  });

  it('should show error when fields are empty', () => {
    component.email = '';
    component.password = '';
    component.login();
    fixture.detectChanges();
    expect(component.errorMessage).toBeTruthy();
    const errorEl = fixture.debugElement.query(By.css('.error'));
    expect(errorEl).toBeTruthy();
  });

  it('should navigate to client panel on successful login for client', () => {
    const spy = spyOn(router, 'navigate');
    component.email = 'user@example.com';
    component.password = 'secret';
    component.role = 'client';
    component.login();
    // wait for simulated timeout
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(['/client']);
    }, 800);
  });

  it('should navigate to photographer panel when role is photographer', () => {
    const spy = spyOn(router, 'navigate');
    component.email = 'photo@example.com';
    component.password = 'secret';
    component.role = 'photographer';
    component.login();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(['/photographer']);
    }, 800);
  });
});
