import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedpointComponent } from './markedpoint.component';

describe('MarkedpointComponent', () => {
  let component: MarkedpointComponent;
  let fixture: ComponentFixture<MarkedpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkedpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkedpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
