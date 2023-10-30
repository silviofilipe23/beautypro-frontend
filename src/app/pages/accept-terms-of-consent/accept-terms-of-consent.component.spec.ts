import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTermsOfConsentComponent } from './accept-terms-of-consent.component';

describe('AcceptTermsOfConsentComponent', () => {
  let component: AcceptTermsOfConsentComponent;
  let fixture: ComponentFixture<AcceptTermsOfConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptTermsOfConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptTermsOfConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
