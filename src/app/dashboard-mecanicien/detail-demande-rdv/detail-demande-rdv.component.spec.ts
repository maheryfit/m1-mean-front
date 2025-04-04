import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandeRdvComponent } from './detail-demande-rdv.component';

describe('DetailDemandeRdvComponent', () => {
  let component: DetailDemandeRdvComponent;
  let fixture: ComponentFixture<DetailDemandeRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDemandeRdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDemandeRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
