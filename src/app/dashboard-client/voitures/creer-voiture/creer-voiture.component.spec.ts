import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerVoitureComponent } from './creer-voiture.component';

describe('CreerVoitureComponent', () => {
  let component: CreerVoitureComponent;
  let fixture: ComponentFixture<CreerVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerVoitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
