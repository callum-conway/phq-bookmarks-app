import { Injectable, computed, signal, inject } from '@angular/core';
import { Bookmark } from '../components/bookmarks-list/bookmarks-list.component';
import { nanoid } from 'nanoid/non-secure';
import { Router } from '@angular/router';

const MOCK_BOOKMARKS: Bookmark[] = [
  { id: 'jfdl093', title: 'Svelte Documentation', url: 'https://svelte.dev/docs', status: 'valid' },
  // { id: 'ksdhf029', title: '', url: 'https://www.reactrouter.com/', status: 'valid' },
  // { id: '123123asd', title: '', url: 'https://www.typescriptlang.org/', status: 'valid' },
  // { id: 'aodf902', title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', status: 'valid' },
  // { id: 'jxnxl394', title: 'CSS-Tricks', url: 'https://css-tricks.com/', status: 'valid' },
  // { id: 'sdklk291', title: 'JavaScript Info', url: 'https://javascript.info/', status: 'valid' },
  // { id: 'lksdf902', title: '', url: 'https://angular.io/', status: 'valid' },
  // { id: 'qwopw203', title: 'Vue.js', url: 'https://vuejs.org/', status: 'valid' },
  // { id: 'dfad938', title: 'React Documentation', url: 'https://reactjs.org/', status: 'valid' },
  // { id: '2hds982', title: 'W3Schools', url: 'https://www.w3schools.com/', status: 'valid' },
  // { id: 'asd9082', title: 'Node.js Docs', url: 'https://nodejs.org/en/docs/', status: 'valid' },
  // { id: 'askd238', title: '', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', status: 'valid' },
  // { id: 'xjwpo893', title: 'CSS Zen Garden', url: 'https://www.csszengarden.com/', status: 'valid' },
  // { id: 'nsx9320', title: 'FreeCodeCamp', url: 'https://www.freecodecamp.org/', status: 'valid' },
  // { id: 'xlkds809', title: 'GitHub Docs', url: 'https://docs.github.com/', status: 'valid' },
  // { id: 'vnsx2092', title: 'TypeScript Documentation', url: 'https://www.typescriptlang.org/docs/', status: 'valid' },
  // { id: 'mnsc2839', title: '', url: 'https://www.codecademy.com/', status: 'valid' },
  // { id: 'lhjfi892', title: 'Frontend Mentor', url: 'https://www.frontendmentor.io/', status: 'valid' },
  // { id: 'pkd0201', title: '', url: 'https://www.smashingmagazine.com/', status: 'valid' },
  // { id: 'xqns1930', title: 'JavaScript30', url: 'https://javascript30.com/', status: 'valid' },
];



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
      this.bookmarks.set(MOCK_BOOKMARKS);
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
