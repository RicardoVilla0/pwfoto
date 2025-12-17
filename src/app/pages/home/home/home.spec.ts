// src/app/pages/home/home.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent (standalone)', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero title', () => {
    const el = fixture.debugElement.query(By.css('.hero-title'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.textContent).toContain('Capturing moments');
  });

  it('should include hero image with local asset path', () => {
    const img = fixture.debugElement.query(By.css('.hero-image'));
    expect(img).toBeTruthy();
    const src = img.nativeElement.getAttribute('src') || '';
    expect(src).toContain('Captura de pantalla 2025-11-18 180606.png');
  });
});
