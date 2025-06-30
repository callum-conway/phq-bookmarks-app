import { Component, inject, computed } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AddBookmarkComponent } from '../add-bookmark/add-bookmark.component';
import { BookmarkService } from '../../bookmarks/bookmark.service';

@Component({
  selector: 'app-edit-bookmark-dialog',
  imports: [DialogModule, ButtonModule, InputTextModule, AddBookmarkComponent],
  templateUrl: './edit-bookmark-dialog.component.html',
  styleUrl: './edit-bookmark-dialog.component.css'
})
export class EditBookmarkDialogComponent {
  public bookmarksService = inject(BookmarkService);

  // toggleDialog() {
  //   this.bookmarksService.toggleEditDialog()
  // }

  // updateBookmark() {
  //   this.bookmarksService.updateBookmark()
  // }
}
