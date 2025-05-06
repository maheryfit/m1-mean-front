import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerRdvComponent } from './creer-rdv.component';

describe('CreerRdvComponent', () => {
  let component: CreerRdvComponent;
  let fixture: ComponentFixture<CreerRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerRdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
