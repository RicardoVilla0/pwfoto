// src/app/photographer-panel/dashboard/dashboard.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotographerDashboardComponent } from './dashboard';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('PhotographerDashboardComponent', () => {
  let component: PhotographerDashboardComponent;
  let fixture: ComponentFixture<PhotographerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotographerDashboardComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotographerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard', () => {
    expect(component).toBeTruthy();
  });

  it('should render stats cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.stat-card'));
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it('should list bookings', () => {
    const items = fixture.debugElement.queryAll(By.css('.booking-item'));
    expect(items.length).toBe(component.bookings.length);
  });

  it('should open lightbox when clicking an album', () => {
    const albumEl = fixture.debugElement.query(By.css('.album-card'));
    expect(albumEl).toBeTruthy();
    albumEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    const lightbox = fixture.debugElement.query(By.css('.lightbox'));
    expect(lightbox).toBeTruthy();
  });
});
