import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChangePassComponent } from './popup-change-pass.component';

describe('PopupChangePassComponent', () => {
  let component: PopupChangePassComponent;
  let fixture: ComponentFixture<PopupChangePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupChangePassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
