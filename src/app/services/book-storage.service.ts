import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStorageService {
  
  private localStorageKey = 'favourites';
  private localStorageKeyDelete = 'edited';
  
  favouritesSubject = new BehaviorSubject<Book[]>([]);

  constructor() {
    if (localStorage.getItem('favourites')) {

      this.favouritesSubject.next(JSON.parse(localStorage.getItem('favourites')!))
    }
  }
  

  
  

  addBookToLocalStorage(response: Book): void {
    const storedBooks = this.getBooksFromLocalStorage();
    storedBooks.push(response);
    localStorage.setItem(this.localStorageKeyDelete, JSON.stringify(storedBooks));
  }

  getBooksFromLocalStorage(): Book[] {
    const storedBooks = localStorage.getItem(this.localStorageKeyDelete);
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  savebook(book: Book) {
    book.isFavourite = true;
    const actualArray = this.favouritesSubject.value;
    const newArray = [...actualArray, book];
    console.log(newArray)
    this.favouritesSubject.next(newArray);
    localStorage.setItem('favourites', JSON.stringify(newArray));
  }
  
  
  updateBookInLocalStorage(updatedBook: Book): void {
    const storedBooks = this.getBooksFromLocalStorage();
    const index = storedBooks.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      storedBooks[index] = updatedBook;
      localStorage.setItem(this.localStorageKeyDelete, JSON.stringify(storedBooks));
    }
  }

  deleteBookFromLocalStorage(bookId: string): void {
    const storedBooks = this.getBooksFromLocalStorage();
    const index = storedBooks.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      storedBooks.splice(index, 1);
      localStorage.setItem(this.localStorageKeyDelete, JSON.stringify(storedBooks));
    }
  }
  removeBook(book: Book): void {
    const favourites = this.favouritesSubject.value;
    const updatedFavourites = favourites.filter((b) => b.id !== book.id);
    this.favouritesSubject.next(updatedFavourites);
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedFavourites));
  }

  toggleFavourites(book: Book) {
    if (this.isFavourite(book)) {
      this.removeBook(book)

    }else{
      this.savebook(book)
    }
  }


  isFavourite(book: Book): boolean {
    if (book && book.id) {
     
      return this.favouritesSubject.value.some((p) => p.id === book.id);
    }
    return false;
  }
}
