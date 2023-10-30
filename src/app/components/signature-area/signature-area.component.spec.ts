import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureAreaComponent } from './signature-area.component';

describe('SignatureAreaComponent', () => {
  let component: SignatureAreaComponent;
  let fixture: ComponentFixture<SignatureAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
