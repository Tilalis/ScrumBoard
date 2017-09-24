import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationItemAddComponent } from './iteration-item-add.component';

describe('IterationItemAddComponent', () => {
  let component: IterationItemAddComponent;
  let fixture: ComponentFixture<IterationItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IterationItemAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
