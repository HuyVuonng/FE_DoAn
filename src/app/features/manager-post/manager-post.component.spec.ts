import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPostComponent } from './manager-post.component';

describe('ManagerPostComponent', () => {
  let component: ManagerPostComponent;
  let fixture: ComponentFixture<ManagerPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
