import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChangepassComponent } from './popup-changepass.component';

describe('PopupChangepassComponent', () => {
  let component: PopupChangepassComponent;
  let fixture: ComponentFixture<PopupChangepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupChangepassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupChangepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
