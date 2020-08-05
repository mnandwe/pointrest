import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedpointDetailComponent } from './markedpoint-detail.component';

describe('MarkedpointDetailComponent', () => {
  let component: MarkedpointDetailComponent;
  let fixture: ComponentFixture<MarkedpointDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkedpointDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkedpointDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
