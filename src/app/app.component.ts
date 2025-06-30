import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookmarkService } from './services/bookmarks/bookmark.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PHQ Bookmarks App';
  private bookmarksService = inject(BookmarkService);

  ngOnInit(): void {
    this.bookmarksService.getBookmarks()
  }
}
