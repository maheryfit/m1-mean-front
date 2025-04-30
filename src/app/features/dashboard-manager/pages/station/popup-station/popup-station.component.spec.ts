import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupStationComponent } from './popup-station.component';

describe('PopupStationComponent', () => {
  let component: PopupStationComponent;
  let fixture: ComponentFixture<PopupStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupStationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
