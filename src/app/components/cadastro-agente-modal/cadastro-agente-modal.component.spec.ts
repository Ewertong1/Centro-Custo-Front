import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAgenteModalComponent } from './cadastro-agente-modal.component';

describe('CadastroAgenteModalComponent', () => {
  let component: CadastroAgenteModalComponent;
  let fixture: ComponentFixture<CadastroAgenteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAgenteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroAgenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
