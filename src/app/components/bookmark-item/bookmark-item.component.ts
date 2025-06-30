import { Component, input, computed, signal } from '@angular/core';
import { BookmarkItemActionsComponent } from '../bookmark-item-actions/bookmark-item-actions.component';
import { Bookmark } from '../bookmarks-list/bookmarks-list.component';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';

/**
 * Represents the status badge indicating the status of a bookmark,
 * used for displaying UI status indicators.
 */
interface StatusBadge {
  severity: 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast';
  label: string;
}

/**
 * Component for displaying a single bookmark item.
 * Displays the bookmark's URL, status and title (if it has a value),
 * along with edit, delete actions for managing the bookmark.
 * URL status is indicated using a badge with a tooltip to explain the status.
 */
@Component({
  selector: 'app-bookmark-item',
  imports: [BookmarkItemActionsComponent, BadgeModule, TooltipModule],
  templateUrl: './bookmark-item.component.html',
  styleUrl: './bookmark-item.component.css'
})
  
export class BookmarkItemComponent {
  /** Bookmark data passed into component. */
  bookmark = input<Bookmark>({ id: '', title: '', url: '', status: 'undefined' });

  /** Finds the correct status severity and label based on the bookmarks status. */
  statusBadge = computed<StatusBadge>(() => {
    switch (this.bookmark().status) {
      case 'valid':
        return { severity: 'success', label: 'URL exists' };
      case 'invalid':
        return { severity: 'danger', label: 'URL does not exist' };
      case 'error':
        return { severity: 'warn', label: 'Unable to verify if URL exists' };
      default:
        return { severity: 'info', label: '' };
    }
  })
}
