import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeStationsComponent } from './liste-stations.component';

describe('ListeStationsComponent', () => {
  let component: ListeStationsComponent;
  let fixture: ComponentFixture<ListeStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeStationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
