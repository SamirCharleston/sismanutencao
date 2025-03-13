import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaoDetalhesComponent } from './medicao-detalhes.component';

describe('MedicaoDetalhesComponent', () => {
  let component: MedicaoDetalhesComponent;
  let fixture: ComponentFixture<MedicaoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicaoDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicaoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
