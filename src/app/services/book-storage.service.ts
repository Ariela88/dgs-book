import { Injectable } from '@angular/core';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookStorageService {


  addBookToLocalStorage(response: Book): void {
    const storedBooks = this.getBooksFromLocalStorage();
    storedBooks.push(response);
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedBooks));
  }

  private localStorageKey = 'favourites';

  constructor() { }

  getBooksFromLocalStorage(): Book[] {
    const storedBooks = localStorage.getItem(this.localStorageKey);
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  saveBook(book: Book): void {
    const storedBooks = this.getBooksFromLocalStorage();
    storedBooks.push(book);
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedBooks));
  }

  updateBookInLocalStorage(updatedBook: Book): void {
    const storedBooks = this.getBooksFromLocalStorage();
    const index = storedBooks.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      storedBooks[index] = updatedBook;
      localStorage.setItem(this.localStorageKey, JSON.stringify(storedBooks));
    }
  }

  deleteBookFromLocalStorage(bookId: string): void {
    const storedBooks = this.getBooksFromLocalStorage();
    const index = storedBooks.findIndex(book => book.id === bookId);
    if (index !== -1) {
      storedBooks.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(storedBooks)); 
    }
  }
}
