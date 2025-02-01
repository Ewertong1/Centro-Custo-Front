import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSuprimentosComponent } from './consulta-suprimentos.component';

describe('ConsultaSuprimentosComponent', () => {
  let component: ConsultaSuprimentosComponent;
  let fixture: ComponentFixture<ConsultaSuprimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaSuprimentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaSuprimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
