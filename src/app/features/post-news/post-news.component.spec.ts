import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNewsComponent } from './post-news.component';

describe('PostNewsComponent', () => {
  let component: PostNewsComponent;
  let fixture: ComponentFixture<PostNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
