import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from '../model/book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  readonly apiUrl = 'https://651a7a94340309952f0d59cb.mockapi.io/book';
  private allBooks: Book[] = [];
  constructor(private http: HttpClient) {
    this.getBooks().subscribe(book => {
      this.allBooks = book;
     
  })}

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + '/' + id);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get(this.apiUrl)
      .pipe(
        map((response: any) => {
          if (Array.isArray(response)) {
            return response as Book[];
          } else {
            console.error('Invalid JSON response:', response);
            return [];
          }
        }),
        catchError(this.handleError)
      );
  }
  createBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, newBook).pipe(catchError(this.handleError));
  }

  updateBook(id: string, updatedBook: Book): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Book>(url, updatedBook).pipe(catchError(this.handleError));
  }

  deleteBook(id: string): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Book>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Errore durante la richiesta HTTP:', error);
    return throwError('Si è verificato un errore durante la richiesta. Riprova più tardi.');
  }
}
