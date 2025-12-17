// src/app/client-panel/dashboard/dashboard.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientDashboardComponent } from './dashboard';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ClientDashboardComponent', () => {
  let component: ClientDashboardComponent;
  let fixture: ComponentFixture<ClientDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDashboardComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create client dashboard', () => {
    expect(component).toBeTruthy();
  });

  it('should render bookings list', () => {
    const items = fixture.debugElement.queryAll(By.css('.booking-item'));
    expect(items.length).toBe(component.bookings.length);
  });

  it('viewBooking should navigate to booking detail', () => {
    const spy = spyOn((component as any).router, 'navigate');
    component.viewBooking(component.bookings[0].id);
    expect(spy).toHaveBeenCalled();
  });

  it('cancelBooking should update booking status to Cancelado', () => {
    const id = component.bookings[0].id;
    component.cancelBooking(id);
    const updated = component.bookings.find(b => b.id === id);
    expect(updated?.status).toBe('Cancelado');
  });
});
