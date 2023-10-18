import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Book } from '../model/book';
import { HttpClient } from '@angular/common/http';
import { BookStorageService } from './book-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {

allBooksSubject = new BehaviorSubject<Book[]>([]);
arrayClone:Book[] = []  
allBooks$ = this.allBooksSubject.asObservable();


jsonBooks:Book[] = [
    {
     "author": "Merle Blanda",
     "title": "Handcrafted Granite Bacon",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Enim iusto quod quod veniam ad delectus. Perspiciatis dolor possimus sint laborum. Voluptates sint reprehenderit quod quod.",
     "id": "5",
     "isFavourite":false
    },
    {
     "author": "Jerry Pfannerstill III",
     "title": "Practical Wooden Car",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Atque mollitia fuga veniam ipsum quibusdam veritatis ea. Eos voluptatibus praesentium. Rerum quidem mollitia.",
     "id": "8",
     "isFavourite":false
    },
    {
     "author": "Diane Cole",
     "title": "Rustic Metal Tuna",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Nobis at velit. Exercitationem dolor ipsam voluptatem tempore necessitatibus. Necessitatibus dolore ut et optio sunt commodi. Eum magni magnam aut perspiciatis veritatis. Neque esse porro repellat possimus odio nemo quos corrupti. Temporibus labore iste expedita enim asperiores repellat neque sint.",
     "id": "9",
     "isFavourite":false
    },
    {
     "author": "Claudia Heathcote",
     "title": "Sleek Frozen Tuna",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Aperiam similique dicta vel tempore. Veritatis suscipit saepe ex ipsam tenetur est possimus alias. Similique consequuntur quam vero nulla laborum impedit vel autem. Ipsa delectus ex possimus impedit. Accusamus suscipit facere suscipit ut veritatis qui. Voluptatum id laborum ipsam nulla suscipit iure illum voluptas.",
     "id": "11",
     "isFavourite":false
    },
    {
     "author": "Holly Medhurst",
     "title": "Incredible Soft Computer",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Dignissimos totam harum odio. Optio adipisci soluta inventore similique. Soluta labore voluptatem voluptatibus sapiente qui culpa nisi. Eum ad laudantium quia praesentium illo magni provident adipisci.",
     "id": "14",
     "isFavourite":false
    },
    {
     "author": "Leon Cremin",
     "title": "Oriental Wooden Keyboard",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Delectus similique saepe maxime eos ut impedit. Occaecati libero ut. Sunt sapiente delectus et earum optio illum suscipit. Voluptate dolor pariatur.",
     "id": "16",
     "isFavourite":false
    },
    {
     "author": "Adam Mosciski",
     "title": "Handmade Soft Gloves",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Ex dolores veniam id. Quas nostrum excepturi. Expedita reprehenderit quae eaque dicta. Nihil eos repellendus molestiae commodi.",
     "id": "17",
     "isFavourite":false
    },
    {
     "author": "Babbo Natale",
     "title": "Pinguini",
     "cover": "https://eidec2hct28.exactdn.com/uploads/Original_WW223791-scaled.jpg?strip=all&lossy=1&ssl=1",
     "description": "la storia dei pinguini",
     "id": "18",
     "isFavourite":false
    },
    {
     "author": "Flora Stehr",
     "title": "Unbranded Plastic Tuna",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Ratione veritatis sint quasi magni recusandae libero est ratione unde. Aut deserunt ad rem id in deleniti nobis. Odit dolorem sequi modi doloremque saepe quae. Repellat tempore aspernatur soluta nihil impedit impedit ipsa veniam rem.",
     "id": "19",
     "isFavourite":false
    },
    {
     "author": "Wilfred Okuneva",
     "title": "Intelligent Soft Mouse",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Eveniet eveniet facilis natus ipsum corporis. Sed mollitia nihil vitae velit. Voluptas magni voluptate explicabo ratione quasi facere voluptates minus eaque. Minima quidem rem nesciunt aut sunt molestias. A perferendis animi vero rerum perferendis corporis debitis soluta voluptate.",
     "id": "20",
     "isFavourite":false
    },
    {
     "author": "Vera Cummings",
     "title": "Elegant Soft Pizza",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Asperiores inventore consequuntur. Repellendus hic neque aperiam voluptatum quos. Voluptatum laborum itaque facere veniam delectus necessitatibus adipisci sit.",
     "id": "21",
     "isFavourite":false
    }
   ]



  constructor(
    private http: HttpClient, 
    private storage:BookStorageService
    ) 
    {
      this.allBooksSubject.next(this.jsonBooks)
    }


  getBook(id: string): Observable<Book> {
    const book = this.jsonBooks.find(b => b.id === id);
    if (book) {
      return new Observable<Book>(observer => {
        observer.next(book);
        observer.complete();
      });
    } else {
      return throwError('Libro non trovato');
    }
  }


  getBooks(): Observable<Book[]> {
    return new Observable<Book[]>(observer => {
      observer.next(this.jsonBooks);
      observer.complete();
    });
  }

  createBook(newBook: Book): Observable<Book> {
    const lastBook = this.jsonBooks[this.jsonBooks.length - 1];
    const lastId = lastBook ? parseInt(lastBook.id) : 0;
    newBook.id = (lastId + 1).toString();
    this.jsonBooks.push(newBook);
    this.allBooksSubject.next(this.jsonBooks);
    return new Observable<Book>(observer => {
      observer.next(newBook);
      observer.complete();
    });
  }
  

  updateBook(id: string, updatedBook: Book): Observable<Book> {
    const index = this.jsonBooks.findIndex(b => b.id === id);
    if (index !== -1) {
      this.jsonBooks[index] = updatedBook;
      this.allBooksSubject.next([...this.jsonBooks]); 
   return new Observable<Book>(observer => {
        observer.next(updatedBook);
        observer.complete();
      });
    } else {
      return throwError('Libro non trovato');
    }
  }
  

  deleteBook(id: string): Observable<void> {
    const index = this.jsonBooks.findIndex(b => b.id === id);
    if (index !== -1) {
      this.jsonBooks.splice(index, 1);
      this.allBooksSubject.next(this.jsonBooks);
      return new Observable<void>(observer => {
        observer.next();
        observer.complete();
      });
    } else {
      return throwError('Libro non trovato');
    }
  }
  


  //Funzione finita e corretta
  searchBooks(searchTerm: string): void {
    const filteredBooks = this.jsonBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.arrayClone = [...filteredBooks];
    this.allBooksSubject.next(this.arrayClone);
}


  
}
