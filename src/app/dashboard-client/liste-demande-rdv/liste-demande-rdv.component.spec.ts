import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeRdvComponent } from './liste-demande-rdv.component';

describe('ListeDemandeRdvComponent', () => {
  let component: ListeDemandeRdvComponent;
  let fixture: ComponentFixture<ListeDemandeRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDemandeRdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDemandeRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
