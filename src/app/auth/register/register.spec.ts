// src/app/auth/register/register.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('RegisterComponent (standalone)', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create register component', () => {
    expect(component).toBeTruthy();
  });

  it('should have required inputs in template', () => {
    const name = fixture.debugElement.query(By.css('input[name="name"]'));
    const email = fixture.debugElement.query(By.css('input[name="email"]'));
    const pass = fixture.debugElement.query(By.css('input[name="password"]'));
    const confirm = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
    expect(name).toBeTruthy();
    expect(email).toBeTruthy();
    expect(pass).toBeTruthy();
    expect(confirm).toBeTruthy();
  });

  it('should show error if passwords do not match', () => {
    component.name = 'Test';
    component.email = 'test@example.com';
    component.password = '123456';
    component.confirmPassword = '654321';
    component.acceptTos = true;
    component.register();
    fixture.detectChanges();
    expect(component.errorMessage).toContain('no coinciden');
    const err = fixture.debugElement.query(By.css('.error'));
    expect(err).toBeTruthy();
  });

  it('should navigate after successful registration', () => {
    const spy = spyOn(router, 'navigate');
    component.name = 'User';
    component.email = 'user@example.com';
    component.password = 'abcdef';
    component.confirmPassword = 'abcdef';
    component.acceptTos = true;
    component.role = 'client';
    component.register();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(['/client']);
    }, 900);
  });
});
