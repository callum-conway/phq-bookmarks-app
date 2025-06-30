import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkItemActionsComponent } from './bookmark-item-actions.component';

describe('BookmarkItemActionsComponent', () => {
  let component: BookmarkItemActionsComponent;
  let fixture: ComponentFixture<BookmarkItemActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkItemActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkItemActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
