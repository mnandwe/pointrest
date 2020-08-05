import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarkedpointComponent } from './add-markedpoint.component';

describe('AddMarkedpointComponent', () => {
  let component: AddMarkedpointComponent;
  let fixture: ComponentFixture<AddMarkedpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMarkedpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarkedpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
