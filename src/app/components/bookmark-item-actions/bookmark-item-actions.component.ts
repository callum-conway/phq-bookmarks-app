import { Component, input, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BookmarkService } from '../../services/bookmarks/bookmark.service';
import { Bookmark } from '../bookmarks-list/bookmarks-list.component';


@Component({
  selector: 'app-bookmark-item-actions',
  imports: [ButtonModule],
  templateUrl: './bookmark-item-actions.component.html',
  styleUrl: './bookmark-item-actions.component.css'
})
export class BookmarkItemActionsComponent {
  bookmark = input<Bookmark>({ id: '', title: '', url: '', status: 'undefined' });
  private bookmarksService = inject(BookmarkService);

  toggleEditBookmarkDialog() {
    this.bookmarksService.toggleEditDialog();
  }

  selectBookmark() {
    this.bookmarksService.selectedBookmark.set(this.bookmark());
  }

  deleteBookmark() {
    this.bookmarksService.deleteBookmark(this.bookmark().id);
  }
}
