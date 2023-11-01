import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientServicesListComponent } from './client-services-list.component';

describe('ClientServicesListComponent', () => {
  let component: ClientServicesListComponent;
  let fixture: ComponentFixture<ClientServicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientServicesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
