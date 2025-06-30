import { Component } from '@angular/core';
import { BookmarksListComponent } from '../../components/bookmarks-list/bookmarks-list.component';
import { EditBookmarkDialogComponent } from '../../components/edit-bookmark-dialog/edit-bookmark-dialog.component';

/**
 * Home page component displaying the list of bookmarks
 * and the edit bookmark dialog.
 */
@Component({
  selector: 'app-home-page',
  imports: [BookmarksListComponent, EditBookmarkDialogComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
  
export class HomePageComponent { }
