import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationAddComponent } from './iteration-add.component';

describe('IterationAddComponent', () => {
  let component: IterationAddComponent;
  let fixture: ComponentFixture<IterationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IterationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
