import { Component, inject, input, SimpleChanges } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BookmarkService } from '../../services/bookmarks/bookmark.service';
import { validUrlCheck } from './valid-url.validator';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bookmark } from '../bookmarks-list/bookmarks-list.component';

/**
 * Input component used for adding or updating bookmarks.
 * It allows users to input a URL, validates the input URL, and 
 * checks if the URL exists by making a HEAD request.
 * Uses a service to manage bookmarks and provides feedback on the URL status.
 */
@Component({
  selector: 'app-add-bookmark',
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './add-bookmark.component.html',
  styleUrl: './add-bookmark.component.css'
})

export class AddBookmarkComponent {
  /** Service for managing bookmarks */
  private bookmarksService = inject(BookmarkService);

  /** Dynamic button text for adding or updating a bookmark */
  buttonText = input<string>('Add Bookmark');

  /** Flag to determine if the component is in update mode for editing bookmarks */
  showUpdateButton = input<boolean>(false);

  /** Input for an existing URL string that is being edited */
  urlString = input<string>('');

  /** Loading state for button while checking URL existence */
  loading: boolean = false;

  /** 
   * Form control for the URL input field 
   * that checks for required, minimum length
   * and valid URL format.
  */
  url = new FormControl(this.urlString(), [
    Validators.required,
    Validators.minLength(5),
    validUrlCheck(),
  ])

  /**
   * Initializes the component and sets up the URL form control.
   * If a urlString value is provided, it sets the value of the URL form control.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['urlString'] && this.urlString()) {
      this.url.setValue(this.urlString());
    }
  }

  /**
   * Checks whether the given URL exists by making a HEAD request.
   * @param url The URL to check.
   * @returns A promise resolving to 'valid', 'invalid', or 'error'.
  */
  urlExistsStatus = async (url: string): Promise<'valid' | 'invalid' | 'error'> => {
    try {
      const response: Response = await fetch(url, { method: 'HEAD' });
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

  /**
   * Calls the bookmarks service to add a new bookmark.
   * It checks if the URL exists and then clears the form control and loading state.
   */
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

  /**
   * Updates an existing bookmark with a new URL and status.
   * Checks if the updated URL exists, updates the bookmark via the service,
   * clears the selected bookmark state, closes the edit dialog,
   * resets the form control, and updates the loading state.
   */
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
