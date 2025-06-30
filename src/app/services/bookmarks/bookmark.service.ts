import { Injectable, computed, signal, inject } from '@angular/core';
import { Bookmark } from '../../components/bookmarks-list/bookmarks-list.component';
import { nanoid } from 'nanoid/non-secure';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private router = inject(Router);
  bookmarks = signal<Bookmark[]>([])
  editDialogOpen = signal<boolean>(false);
  selectedBookmark = signal<Bookmark>({ id: '', title: '', url: '', status: 'undefined' });

  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(20);
  totalPages = computed(() => {
    return Math.ceil(this.bookmarks().length / this.itemsPerPage());
  });

  paginatedItems = computed(() => {
    let startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    let endIndex = startIndex + this.itemsPerPage();
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

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  getBookmarks() {
    const myBookmarks = localStorage.getItem('my-bookmarks');
    if (!myBookmarks) {
      return;
    } else {
      this.bookmarks.set(JSON.parse(myBookmarks));
    }
  }

  setBookmarks() {
    localStorage.setItem('my-bookmarks', JSON.stringify(this.bookmarks()));
  }

  toggleEditDialog() {
    this.editDialogOpen.set(!this.editDialogOpen());
  }

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

  updateBookmark(updatedBookmark: Bookmark) {
    const updatedBookmarks = this.bookmarks().map(bookmark => bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark);
    this.bookmarks.set(updatedBookmarks);
    this.setBookmarks();
  }

  deleteBookmark(id: string) {
    const bookmarkExists = this.bookmarks().some(bookmark => bookmark.id === id);

    if (!bookmarkExists) {
      console.error(`Bookmark with id: ${id} does not exist.`);
      return;
    }

    const updatedBookmarks = this.bookmarks().filter(bookmark => bookmark.id !== id);
    this.bookmarks.set(updatedBookmarks)
    this.setBookmarks();
  }
}
