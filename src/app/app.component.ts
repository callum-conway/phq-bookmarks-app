import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookmarkService } from './services/bookmarks/bookmark.service';

/**
 * Main application component.
 * It initializes the bookmarks service and sets the title of the app.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'PHQ Bookmarks App';
  private bookmarksService = inject(BookmarkService);

  ngOnInit(): void {
    this.bookmarksService.getBookmarks()
  }
}
