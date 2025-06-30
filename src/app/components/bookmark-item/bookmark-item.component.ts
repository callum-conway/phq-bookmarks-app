import { Component, input, computed, signal } from '@angular/core';
import { BookmarkItemActionsComponent } from '../bookmark-item-actions/bookmark-item-actions.component';
import { Bookmark } from '../bookmarks-list/bookmarks-list.component';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';

interface StatusBadge {
  severity: 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast';
  label: string;
}

@Component({
  selector: 'app-bookmark-item',
  imports: [BookmarkItemActionsComponent, BadgeModule, TooltipModule],
  templateUrl: './bookmark-item.component.html',
  styleUrl: './bookmark-item.component.css'
})
  
export class BookmarkItemComponent {
  bookmark = input<Bookmark>({ id: '', title: '', url: '', status: 'undefined' });
  // severityType = signal<"info" | "success" | "warn" | "danger" | "secondary" | "contrast">('info');

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
