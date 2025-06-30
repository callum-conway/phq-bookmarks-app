import { Component, inject, input, SimpleChanges } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BookmarkService } from '../../services/bookmarks/bookmark.service';
import { validUrlCheck } from './valid-url.validator';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bookmark } from '../bookmarks-list/bookmarks-list.component';

@Component({
  selector: 'app-add-bookmark',
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './add-bookmark.component.html',
  styleUrl: './add-bookmark.component.css'
})

export class AddBookmarkComponent {
  private bookmarksService = inject(BookmarkService);
  buttonText = input<string>('Add Bookmark');
  showUpdateButton = input<boolean>(false);
  urlString = input<string>('');
  loading: boolean = false;

  url = new FormControl(this.urlString(), [
    Validators.required,
    Validators.minLength(5),
    validUrlCheck(),
  ])

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['urlString'] && this.urlString()) {
      this.url.setValue(this.urlString());
    }
  }

  urlExistsStatus = async (url: string): Promise<'valid' | 'invalid' | 'error'> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return 'valid';
      } else {
        return 'invalid';
      }
    } catch (error) {
      console.error('Error checking URL:', error);
      return 'error';
    }
  }

  addBookmark() {
    this.loading = true;
    this.urlExistsStatus(this.url.value ?? '').then((status) => {
      if (this.url.valid && this.url.value !== null) {
        this.bookmarksService.addBookmark(this.url.value, status);
        this.url.reset('');
        this.url.setValue('');
      }
      this.loading = false
    })
  }

  updateBookmark() {
    this.loading = true;
    this.urlExistsStatus(this.url.value ?? '').then((status) => {
      if (this.url.valid && this.url.value !== null) {
        const updatedBookmark: Bookmark = {
          ...this.bookmarksService.selectedBookmark(),
          url: this.url.value,
          status: status,
        };
        this.bookmarksService.selectedBookmark.set({ id: '', title: '', url: '', status: 'undefined' });
        this.bookmarksService.toggleEditDialog();
        this.url.reset('');
        this.url.setValue('');
        this.bookmarksService.updateBookmark(updatedBookmark);
      }
      this.loading = false
    })
  }
}
