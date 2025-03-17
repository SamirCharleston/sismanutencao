import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrotaDashboardComponent } from './frota-dashboard.component';

describe('FrotaDashboardComponent', () => {
  let component: FrotaDashboardComponent;
  let fixture: ComponentFixture<FrotaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrotaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrotaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
