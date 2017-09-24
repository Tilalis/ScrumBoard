import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationManagerComponent } from './iteration-manager.component';

describe('IterationManagerComponent', () => {
  let component: IterationManagerComponent;
  let fixture: ComponentFixture<IterationManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IterationManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
