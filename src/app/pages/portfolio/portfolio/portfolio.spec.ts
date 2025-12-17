// src/app/pages/portfolio/portafolio/portafolio.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortafolioComponent } from './portfolio';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('PortafolioComponent (standalone)', () => {
  let component: PortafolioComponent;
  let fixture: ComponentFixture<PortafolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PortafolioComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create portfolio component', () => {
    expect(component).toBeTruthy();
  });

  it('should have at least one album', () => {
    expect(component.albums.length).toBeGreaterThan(0);
  });

  it('should render gallery grid in template', () => {
    const grid = fixture.debugElement.query(By.css('.gallery-grid'));
    expect(grid).toBeTruthy();
  });

  it('should open album panel when calling openAlbumPanel', () => {
    const album = component.albums[0];
    component.openAlbumPanel(album);
    fixture.detectChanges();

    expect(component.openAlbum).toBeTruthy();
    const panel = fixture.debugElement.query(By.css('.album-panel'));
    expect(panel).toBeTruthy();
  });

  it('should open lightbox when calling openLightbox inside an open album', () => {
    // ensure album is open first
    component.openAlbumPanel(component.albums[0]);
    fixture.detectChanges();

    component.openLightbox(0);
    fixture.detectChanges();

    expect(component.lightboxIndex).toBe(0);
    const lightbox = fixture.debugElement.query(By.css('.lightbox'));
    expect(lightbox).toBeTruthy();
  });
});
