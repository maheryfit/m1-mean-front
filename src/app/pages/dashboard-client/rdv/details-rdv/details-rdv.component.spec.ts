import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRdvComponent } from './details-rdv.component';

describe('DetailsRdvComponent', () => {
  let component: DetailsRdvComponent;
  let fixture: ComponentFixture<DetailsRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsRdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
