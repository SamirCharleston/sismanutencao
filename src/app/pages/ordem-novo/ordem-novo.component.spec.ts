import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemNovoComponent } from './ordem-novo.component';

describe('OrdemNovoComponent', () => {
  let component: OrdemNovoComponent;
  let fixture: ComponentFixture<OrdemNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdemNovoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdemNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
