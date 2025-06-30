import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BookmarkService } from '../../bookmarks/bookmark.service';

@Component({
  selector: 'app-list-pagination',
  imports: [ButtonModule],
  templateUrl: './list-pagination.component.html',
  styleUrl: './list-pagination.component.css'
})

export class ListPaginationComponent {
  private bookmarksService = inject(BookmarkService);
  currentPage = computed(() => this.bookmarksService.currentPage());
  totalPages = computed(() => this.bookmarksService.totalPages());
  pageLinksArray = computed(() => {
    const windowSize = 5;
    const halfWindow = Math.floor(windowSize / 2);
    let startPage = this.currentPage() - halfWindow;
    let endPage = this.currentPage() + halfWindow;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(windowSize, this.totalPages());
    }
    if (endPage > this.totalPages()) {
      endPage = this.totalPages();
      startPage = Math.max(this.totalPages() - windowSize + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  });

  nextPage() {
    this.bookmarksService.nextPage();
  }

  prevPage() {
    this.bookmarksService.prevPage();
  }

  goToPage(page: number) {
    this.bookmarksService.goToPage(page);
  }
}
