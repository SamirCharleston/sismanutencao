import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdensDeServicoComponent } from './ordens-de-servico.component';

describe('OrdensDeServicoComponent', () => {
  let component: OrdensDeServicoComponent;
  let fixture: ComponentFixture<OrdensDeServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdensDeServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdensDeServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
