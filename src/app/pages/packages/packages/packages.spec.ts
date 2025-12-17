// src/app/pages/packages/packages/packages.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackagesComponent } from './packages';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('PackagesComponent (standalone)', () => {
  let component: PackagesComponent;
  let fixture: ComponentFixture<PackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create packages component', () => {
    expect(component).toBeTruthy();
  });

  it('should have at least one paquete', () => {
    expect(component.paquetes.length).toBeGreaterThan(0);
  });

  it('should select a package when seleccionarPaquete is called', () => {
    component.seleccionarPaquete(component.paquetes[0]);
    expect(component.selectedPackage).toBeTruthy();
    expect(component.selectedPackage?.id).toBe(component.paquetes[0].id);
  });

  it('should render the title', () => {
    const titleEl = fixture.debugElement.query(By.css('.title'));
    expect(titleEl).toBeTruthy();
    expect(titleEl.nativeElement.textContent).toContain('Paquetes');
  });
});
