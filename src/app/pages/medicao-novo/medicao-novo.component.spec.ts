import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaoNovoComponent } from './medicao-novo.component';

describe('MedicaoNovoComponent', () => {
  let component: MedicaoNovoComponent;
  let fixture: ComponentFixture<MedicaoNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicaoNovoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicaoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
