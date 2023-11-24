import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListAllComponent } from './service-list-all.component';

describe('ServiceListAllComponent', () => {
  let component: ServiceListAllComponent;
  let fixture: ComponentFixture<ServiceListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceListAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
