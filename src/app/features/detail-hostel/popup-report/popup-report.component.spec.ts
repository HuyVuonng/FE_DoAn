import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupReportComponent } from './popup-report.component';

describe('PopupReportComponent', () => {
  let component: PopupReportComponent;
  let fixture: ComponentFixture<PopupReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
