import { Component, inject, computed } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AddBookmarkComponent } from '../add-bookmark/add-bookmark.component';
import { BookmarkService } from '../../services/bookmarks/bookmark.service';

/**
 * Component for editing a bookmark.
 * It uses the AddBookmarkComponent for the form,
 * and provides a dialog interface for editing bookmarks.
 */
@Component({
  selector: 'app-edit-bookmark-dialog',
  imports: [DialogModule, ButtonModule, InputTextModule, AddBookmarkComponent],
  templateUrl: './edit-bookmark-dialog.component.html',
  styleUrl: './edit-bookmark-dialog.component.css'
})
export class EditBookmarkDialogComponent {
  /** Service for managing bookmarks */
  public bookmarksService = inject(BookmarkService);
}
