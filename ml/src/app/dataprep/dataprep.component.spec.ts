import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataprepComponent } from './dataprep.component';

describe('DataprepComponent', () => {
  let component: DataprepComponent;
  let fixture: ComponentFixture<DataprepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataprepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataprepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
