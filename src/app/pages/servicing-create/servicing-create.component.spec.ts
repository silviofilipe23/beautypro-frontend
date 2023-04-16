import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicingCreateComponent } from './servicing-create.component';

describe('ServicingCreateComponent', () => {
  let component: ServicingCreateComponent;
  let fixture: ComponentFixture<ServicingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicingCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
