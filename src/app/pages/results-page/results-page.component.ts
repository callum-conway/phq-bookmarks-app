import { Component, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BookmarkService } from '../../services/bookmarks/bookmark.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Bookmark } from '../../components/bookmarks-list/bookmarks-list.component';
import { ButtonModule } from 'primeng/button';

/**
 * Results page component shown after adding a new bookmark.
 * It displays the details of the bookmark
 * and provides options to visit the bookmark or go back to the home page.
 */
@Component({
  selector: 'app-results-page',
  imports: [CardModule, RouterLink, ButtonModule],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.css'
})
export class ResultsPageComponent {
  private bookmarksService = inject(BookmarkService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  bookmark = signal<Bookmark>({
    id: '',
    title: '',
    url: '',
    status: 'undefined'
  });

  /** 
   * When the component initializes, checks for a bookmark ID in the query parameters.
   * If a valid bookmark ID is found, it retrieves the bookmark details
   * and sets it to the `bookmark` signal.
   * If no bookmark ID is found, it redirects the user to the home page.
   */
  ngOnInit(): void {
    let bookmarkId = this.route.snapshot.queryParamMap.get('id');
    const resultsBookmark = this.bookmarksService.bookmarks().find(bookmark => bookmark.id === bookmarkId);

    if (!bookmarkId || !resultsBookmark) {
      console.warn('No bookmark ID found in query params. Redirecting to Home Page.');
      this.router.navigate(['/']);
    }
    this.bookmark.set(resultsBookmark || { id: '', title: '', url: '', status: 'undefined' });
  }
}
