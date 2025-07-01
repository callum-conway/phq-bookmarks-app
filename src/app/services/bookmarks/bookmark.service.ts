import { Injectable, computed, signal, inject } from '@angular/core';
import { Bookmark } from '../../components/bookmarks-list/bookmarks-list.component';
import { nanoid } from 'nanoid/non-secure';
import { Router } from '@angular/router';
import { MOCK_BOOKMARKS } from './mock-bookmarks';

/**
 * Service for managing bookmarks.
 * Provides methods to add, update, delete, and retrieve bookmarks,
 * as well as pagination functionality.
 * Saves bookmarks to local storage and retrieves them on initialization.
 */
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private router = inject(Router);

  /** Signal to hold the list of all bookmarks. */
  bookmarks = signal<Bookmark[]>([])

  /** Signal to control the visibility of the edit bookmark dialog. */
  editDialogOpen = signal<boolean>(false);

  /** Signal to hold the currently selected bookmark for editing. */
  selectedBookmark = signal<Bookmark>({ id: '', title: '', url: '', status: 'undefined' });

  /** Check for and retrieve any bookmarks saved in local storage and assign to bookmarks signal. */
  getBookmarks() {
    const myBookmarks: string | null = localStorage.getItem('my-bookmarks');
    console.log('Retrieving bookmarks from local storage:', myBookmarks);
    if (!myBookmarks) {
      console.log('No bookmarks found in local storage, using mock data.');
      this.bookmarks.set(MOCK_BOOKMARKS);
      return;
    } else {
      this.bookmarks.set(JSON.parse(myBookmarks));
    }
  }

  /** Update local storage bookmark items. */
  setBookmarks() {
    localStorage.setItem('my-bookmarks', JSON.stringify(this.bookmarks()));
  }

  toggleEditDialog() {
    this.editDialogOpen.set(!this.editDialogOpen());
  }

  /**
   * Creates a new bookmark object with unique ID.
   * Updates bookmarks signal with new bookmark and saves to local storage.
   * Redirects to the results page with the new bookmark's ID as a query parameter.
   * @param url - The URL of the bookmark to be added.
   * @param status - The status of the bookmark (valid, invalid, or error).
   */
  addBookmark(url: string, status: 'valid' | 'invalid' | 'error') {
    const newBookmark: Bookmark = {
      id: nanoid(6),
      title: '',
      url: url,
      status: status
    };

    this.bookmarks.set([newBookmark, ...this.bookmarks()]);
    this.setBookmarks();

    this.router.navigate(['/results'], { queryParams: { id: newBookmark.id } });
  }

  /**
   * Updates an existing bookmark with a new URL and status then saves to local storage.
   * @param updatedBookmark - The updated bookmark object containing the new URL and status.
   */
  updateBookmark(updatedBookmark: Bookmark) {
    const updatedBookmarks: Bookmark[] = this.bookmarks().map(bookmark => bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark);
    this.bookmarks.set(updatedBookmarks);
    this.setBookmarks();
  }

  /**
   * Deletes a bookmark by its ID.
   * If the bookmark does not exist, it logs an error message.
   * Updates bookmarks signal and saves changes to local storage.
   * @param id - The ID of the bookmark to be deleted.
   */
  deleteBookmark(id: string) {
    const bookmarkExists: boolean = this.bookmarks().some(bookmark => bookmark.id === id);

    if (!bookmarkExists) {
      console.error(`Bookmark with id: ${id} does not exist.`);
      return;
    }

    const updatedBookmarks: Bookmark[] = this.bookmarks().filter(bookmark => bookmark.id !== id);
    this.bookmarks.set(updatedBookmarks)
    this.setBookmarks();
  }


  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(20);
  totalPages = computed<number>(() => {
    return Math.ceil(this.bookmarks().length / this.itemsPerPage());
  });

  /**
   * Computes the paginated items based on the current page and items per page.
   * It calculates the start and end index for slicing the bookmarks array.
   * @returns An array of bookmarks for the current page.
   */
  paginatedItems = computed<Bookmark[]>(() => {
    let startIndex: number = (this.currentPage() - 1) * this.itemsPerPage();
    let endIndex: number = startIndex + this.itemsPerPage();
    return this.bookmarks().slice(startIndex, endIndex);
  })

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  /**
   * Moves to a specific page number if it is within valid range.
   * @param page - The page number to navigate to.
   */ 
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
