import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPessoaComponent } from './consulta-pessoa.component';

describe('ConsultaPessoaComponent', () => {
  let component: ConsultaPessoaComponent;
  let fixture: ComponentFixture<ConsultaPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaPessoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
