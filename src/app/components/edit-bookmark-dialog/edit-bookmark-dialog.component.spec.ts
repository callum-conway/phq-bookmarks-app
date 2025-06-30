import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookmarkDialogComponent } from './edit-bookmark-dialog.component';

describe('EditBookmarkDialogComponent', () => {
  let component: EditBookmarkDialogComponent;
  let fixture: ComponentFixture<EditBookmarkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookmarkDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookmarkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
