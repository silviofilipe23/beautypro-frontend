import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTermOfConsentComponent } from './dialog-term-of-consent.component';

describe('DialogTermOfConsentComponent', () => {
  let component: DialogTermOfConsentComponent;
  let fixture: ComponentFixture<DialogTermOfConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTermOfConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTermOfConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
