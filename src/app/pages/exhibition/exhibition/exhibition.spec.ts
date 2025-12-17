// src/app/pages/exhibition/exhibition/exhibition.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExhibitionComponent } from './exhibition';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ExhibitionComponent (standalone)', () => {
  let component: ExhibitionComponent;
  let fixture: ComponentFixture<ExhibitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExhibitionComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExhibitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create exhibition component', () => {
    expect(component).toBeTruthy();
  });

  it('should have exposiciones with items', () => {
    expect(component.exposiciones.length).toBeGreaterThan(0);
  });

  it('should open detail when verDetalle is called', () => {
    component.verDetalle(component.exposiciones[0], 0);
    fixture.detectChanges();
    expect(component.selected).toBeTruthy();
    const detail = fixture.debugElement.query(By.css('.expo-detail'));
    expect(detail).toBeTruthy();
  });
});
