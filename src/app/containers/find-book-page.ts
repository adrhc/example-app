import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as book from '../actions/book';
import { Book } from '../models/book';


@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-search [query]="searchQuery$ | async" [searching]="loading$ | async" (search)="search($event)"></bc-book-search>
    <bc-book-preview-list [books]="books$ | async"></bc-book-preview-list>
  `
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.searchQuery$ = store.select(fromRoot.getSearchQuery).do((o) => {
      console.log(`[FindBookPageComponent] searchQuery$:`);
      console.log(o);
    }).take(1);
    this.books$ = store.select(fromRoot.getSearchResults).do((o) => {
      console.log(`[FindBookPageComponent] books$:`);
      console.log(o);
    });
    this.loading$ = store.select(fromRoot.getSearchLoading).do((o) => {
      console.log(`[FindBookPageComponent] loading$:`);
      console.log(o);
    });
  }

  search(query: string) {
    console.log(`[FindBookPageComponent] query: ${query}`);
    this.store.dispatch(new book.SearchAction(query));
  }
}
