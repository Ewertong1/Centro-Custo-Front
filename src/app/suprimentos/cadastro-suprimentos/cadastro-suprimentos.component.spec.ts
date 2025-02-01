import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSuprimentosComponent } from './cadastro-suprimentos.component';

describe('CadastroSuprimentosComponent', () => {
  let component: CadastroSuprimentosComponent;
  let fixture: ComponentFixture<CadastroSuprimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroSuprimentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroSuprimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
