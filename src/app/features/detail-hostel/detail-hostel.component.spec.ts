import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHostelComponent } from './detail-hostel.component';

describe('DetailHostelComponent', () => {
  let component: DetailHostelComponent;
  let fixture: ComponentFixture<DetailHostelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailHostelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailHostelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
