import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauMecanicienComponent } from './niveau-mecanicien.component';

describe('NiveauMecanicienComponent', () => {
  let component: NiveauMecanicienComponent;
  let fixture: ComponentFixture<NiveauMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiveauMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
