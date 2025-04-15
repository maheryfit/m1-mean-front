import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMecanicienComponent } from './role-mecanicien.component';

describe('RoleMecanicienComponent', () => {
  let component: RoleMecanicienComponent;
  let fixture: ComponentFixture<RoleMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
