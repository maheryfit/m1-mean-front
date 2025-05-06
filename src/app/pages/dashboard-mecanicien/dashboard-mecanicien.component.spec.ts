import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMecanicienComponent } from './dashboard-mecanicien.component';

describe('DashboardMecanicienComponent', () => {
  let component: DashboardMecanicienComponent;
  let fixture: ComponentFixture<DashboardMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
