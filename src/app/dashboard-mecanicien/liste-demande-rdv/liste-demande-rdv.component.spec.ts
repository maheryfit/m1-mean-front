import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeRdvMecanicienComponent } from './liste-demande-rdv.component';

describe('ListeDemandeRdvComponent', () => {
  let component: ListeDemandeRdvMecanicienComponent;
  let fixture: ComponentFixture<ListeDemandeRdvMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDemandeRdvMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDemandeRdvMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
