import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlimPopupModalComponent } from './modal-popup.component';

describe('SmartCatPopupComponent', () => {
  let component: SlimPopupModalComponent;
  let fixture: ComponentFixture<SlimPopupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlimPopupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlimPopupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
