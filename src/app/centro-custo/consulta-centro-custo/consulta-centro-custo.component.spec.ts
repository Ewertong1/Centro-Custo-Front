import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCentroCustoComponent } from './consulta-centro-custo.component';

describe('ConsultaCentroCustoComponent', () => {
  let component: ConsultaCentroCustoComponent;
  let fixture: ComponentFixture<ConsultaCentroCustoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaCentroCustoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaCentroCustoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
