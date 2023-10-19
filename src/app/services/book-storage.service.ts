import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStorageService {
  localStorageKey = 'favourites';
  localStorageKeyDelete = 'edited';
  favouritesSubject = new BehaviorSubject<Book[]>(
    this.getBooksFromLocalStorage()
  );

  constructor() {
    if (localStorage.getItem(this.localStorageKey)) {
      this.favouritesSubject.next(
        JSON.parse(localStorage.getItem(this.localStorageKey)!)
      );
    }
  }

  updateBookInLocalStorage(updatedBook: Book): void {
    const storedBooks = this.getBooksFromLocalStorage();
    const index = storedBooks.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      storedBooks[index] = updatedBook;
      localStorage.setItem(
        this.localStorageKeyDelete,
        JSON.stringify(storedBooks)
      );
    }
  }

  getBooksFromLocalStorage(): Book[] {
    const storedBooks = localStorage.getItem(this.localStorageKey);
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  savebookInFavourites(book: Book) {
    book.isFavourite = true;
    const actualArray = this.favouritesSubject.value;
    if (Array.isArray(actualArray)) {
      const newArray = [...actualArray, book];
      this.favouritesSubject.next(newArray);
      localStorage.setItem(this.localStorageKey, JSON.stringify(newArray));
    } else {
      const newArray = [book];
      this.favouritesSubject.next(newArray);
      localStorage.setItem(this.localStorageKey, JSON.stringify(newArray));
    }
  }

  removeBookToFavourites(book: Book): void {
    const favourites = this.favouritesSubject.value;
    const updatedFavourites = favourites.filter((b) => b.id !== book.id);
    this.favouritesSubject.next(updatedFavourites);
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(updatedFavourites)
    );
  }

  toggleFavourites(book: Book) {
    if (this.isFavourite(book)) {
      this.removeBookToFavourites(book);
    } else {
      this.savebookInFavourites(book);
    }
  }

  isFavourite(book: Book): boolean {
    const favoritesArray = this.favouritesSubject.value;
    if (Array.isArray(favoritesArray)) {
      return favoritesArray.some((p) => p.id === book.id);
    }
    return false;
  }
}
