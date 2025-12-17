// src/app/shared/footer/footer.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('FooterComponent (standalone)', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year', () => {
    const brandEl = fixture.debugElement.query(By.css('.brand'));
    expect(brandEl.nativeElement.textContent).toContain(component.currentYear.toString());
  });

  it('should have social links pointing to main pages', () => {
    const anchors = fixture.debugElement.queryAll(By.css('.socials a'));
    const hrefs = anchors.map(a => a.nativeElement.getAttribute('href'));
    expect(hrefs).toContain('https://www.instagram.com/');
    expect(hrefs).toContain('https://www.facebook.com/');
    expect(hrefs).toContain('https://www.whatsapp.com/');
  });
});
