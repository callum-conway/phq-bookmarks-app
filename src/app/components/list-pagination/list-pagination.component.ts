import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BookmarkService } from '../../services/bookmarks/bookmark.service';

/**
 * Component for displaying pagination controls for a list of bookmarks,
 * allowing users to navigate through pages of bookmarks.
 * Dynamically updates the page numbers displayed when additional
 * bookmarks are added.
 */
@Component({
  selector: 'app-list-pagination',
  imports: [ButtonModule],
  templateUrl: './list-pagination.component.html',
  styleUrl: './list-pagination.component.css'
})

export class ListPaginationComponent {
  private bookmarksService = inject(BookmarkService);
  currentPage = computed<number>(() => this.bookmarksService.currentPage());
  totalPages = computed<number>(() => this.bookmarksService.totalPages());

  /** Array of page items that dynamically updates depending on the current page. */
  pageLinksArray = computed<number[]>(() => {
    const windowSize: number = 5; // Number of page links to display at one time
    const halfWindow: number = Math.floor(windowSize / 2);
    let startPage: number = this.currentPage() - halfWindow;
    let endPage: number = this.currentPage() + halfWindow;

    // If the calculated startPage is less than 1 (near the beginning),
    // set startPage to 1 and show as many pages as possible 
    // up to either windowSize or the total number of pages.
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(windowSize, this.totalPages());
    }

    // If the calculated endPage exceeds the total number of pages (near the end),
    // set endPage to the total, and shift startPage backward to ensure the window
    // remains the correct size (but not below 1).
    if (endPage > this.totalPages()) {
      endPage = this.totalPages();
      startPage = Math.max(this.totalPages() - windowSize + 1, 1);
    }
    
    // Return an array of the page numbers so that it can be looped in the template
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
