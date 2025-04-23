import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandeRdvMecanicienComponent } from './detail-demande-rdv.component';

describe('DetailDemandeRdvComponent', () => {
  let component: DetailDemandeRdvMecanicienComponent;
  let fixture: ComponentFixture<DetailDemandeRdvMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDemandeRdvMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDemandeRdvMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
