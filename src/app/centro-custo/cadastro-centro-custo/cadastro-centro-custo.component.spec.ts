import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCentroCustoComponent } from './cadastro-centro-custo.component';

describe('CadastroCentroCustoComponent', () => {
  let component: CadastroCentroCustoComponent;
  let fixture: ComponentFixture<CadastroCentroCustoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCentroCustoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroCentroCustoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
