import { Component, input, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BookmarkService } from '../../services/bookmarks/bookmark.service';
import { Bookmark } from '../bookmarks-list/bookmarks-list.component';

/**
 * Component for displaying actions related to a single bookmark item.
 * Provides buttons for deleting, editing, and visiting the bookmark.
 */
@Component({
  selector: 'app-bookmark-item-actions',
  imports: [ButtonModule],
  templateUrl: './bookmark-item-actions.component.html',
  styleUrl: './bookmark-item-actions.component.css'
})
export class BookmarkItemActionsComponent {
  /** Bookmark data passed into component. */
  bookmark = input<Bookmark>({ id: '', title: '', url: '', status: 'undefined' });
  
  /** Service for managing bookmarks */
  private bookmarksService = inject(BookmarkService);

  /** Opens the edit bookmark dialog component for editing a bookmark */
  toggleEditBookmarkDialog() {
    this.bookmarksService.toggleEditDialog();
  }

  /** Updates the selectedBookmark signal inside the 
   * bookmarks service which is used by the edit bookmark dialog.
   */
  selectBookmark() {
    this.bookmarksService.selectedBookmark.set(this.bookmark());
  }

  /** Triggers the deleteBookmark method inside the bookmarks service */
  deleteBookmark() {
    this.bookmarksService.deleteBookmark(this.bookmark().id);
  }
}
