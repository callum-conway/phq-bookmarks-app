import { Component, computed, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BookmarkItemComponent } from '../bookmark-item/bookmark-item.component';
import { AddBookmarkComponent } from '../add-bookmark/add-bookmark.component';
import { BookmarkService } from '../../services/bookmarks/bookmark.service';
import { ListPaginationComponent } from '../list-pagination/list-pagination.component';

export interface Bookmark {
  id: string;
  title?: string;
  url: string;
  status: 'valid' | 'invalid' | 'error' | 'undefined';
}

@Component({
  selector: 'app-bookmarks-list',
  imports: [CardModule, BookmarkItemComponent, AddBookmarkComponent, ListPaginationComponent],
  templateUrl: './bookmarks-list.component.html',
  styleUrl: './bookmarks-list.component.css'
})

export class BookmarksListComponent {
  private bookmarksService = inject(BookmarkService);
  bookmarks = computed(() => this.bookmarksService.paginatedItems());
}
