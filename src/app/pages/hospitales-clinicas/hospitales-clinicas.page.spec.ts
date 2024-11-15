import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HospitalesClinicasPage } from './hospitales-clinicas.page';

describe('HospitalesClinicasPage', () => {
  let component: HospitalesClinicasPage;
  let fixture: ComponentFixture<HospitalesClinicasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalesClinicasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
