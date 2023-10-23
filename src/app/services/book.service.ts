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

jsonBooks:Book[] = 
  [
    {
     "author": "Carlo Collodi",
     "title": "Pinocchio",
     "cover": "https://laletteraturaenoi.it/wp-content/themes/yootheme/cache/b7/vululilio-b753d48f.webp",
     "description": "Le avventure di Pinocchio. Storia di un burattino è un romanzo fantastico per ragazzi scritto da Carlo Collodi, pseudonimo del giornalista e scrittore Carlo Lorenzini, pubblicato per la prima volta a Firenze nel febbraio 1883. Racconta le esperienze tragicomiche di Pinocchio, una marionetta animata scolpita dal falegname Geppetto, che grazie all'aiuto della Fata dai capelli turchini riesce a maturare moralmente finché diventa un bambino vero. ",
     "id": "5",
     "isFavourite":false,
     "category": "bambini",
     "isRead":false
    },
    {
     "author": "J.K.Rowling",
     "title": "Harry Potter e la pietra filosofale",
     "cover": "https://m.media-amazon.com/images/I/718kKmxQBWL._AC_UF1000,1000_QL80_.jpg",
     "description": "Harry Potter è un predestinato: ha una cicatrice a forma di saetta sulla fronte e provoca strani fenomeni, come quello di farsi ricrescere in una notte i capelli inesorabilmente tagliati dai perfidi zii. Ma solo in occasione del suo undicesimo compleanno gli si rivelano la sua natura e il suo destino, e il mondo misterioso cui di diritto appartiene. Un mondo dove regna la magia; un universo popolato da gufi portalettere, scope volanti, caramelle al gusto di cavolini di Bruxelles, ritratti che scappano... Età di lettura: da 10 anni.",
     "id": "8",
     "isFavourite":false,
     "category": "fantasy",
     "isRead":false
    },
    {
     "author": "George Orwell",
     "title": "1984",
     "cover": "https://m.media-amazon.com/images/I/819js3EQwbL._AC_UF1000,1000_QL80_.jpg",
     "description": "1984 (titolo orig. Nineteen Eighty-Four, anche pubblicato come 1984) è un romanzo distopico di fantapolitica, oltreché racconto morale, dello scrittore inglese George Orwell, pubblicato l'8 giugno 1949. Ultimo lavoro da lui completato, e quinto romanzo, è incentrato sulle conseguenze del totalitarismo, sulla sorveglianza di massa, sulla repressione delle libertà e l'irreggimentazione del popolo e dei comportamenti all'interno della società. Orwell, un socialista libertario, modellò lo stato autoritario del romanzo sia sull'Unione Sovietica di Stalin che sulla Germania nazista di Hitler. Ancora più in generale, il romanzo analizza il ruolo della verità e dei fatti dentro alle società, e degli astuti sistemi nei quali essi possano essere manipolati",
     "id": "9",
     "isFavourite":false,
     "category": "fantapolitica",
     "isRead":false
    },
    {
     "author": "Agatha Christie",
     "title": "Assassinio sull'Orient Express",
     "cover": "https://www.ibs.it/images/9788804732532_0_536_0_75.jpg",
     "description": "Assassinio sull\n'Orient Express (titolo orig. Murder on the Orient Express) è un romanzo giallo di Agatha Christie. Pubblicato nel Regno Unito nel 1934, vede protagonista l\n'investigatore belga Hercule Poirot ed è uno dei più noti lavori della scrittrice inglese",   
     "id": "11",
     "isFavourite":false,
     "category": "giallo",
     "isRead":false
    },
    {
     "author": "Igor Sibaldi",
     "title": "La Russia non esiste",
     "cover": "https://www.mondadori.it/content/uploads/2023/05/978880477241HIG-234x360.jpg?x48492",
     "description": "Nil, nell’estate del 1919, è un bambino timido che pensa alla felicità, quando d’un tratto la Guerra civile travolge il suo piccolo mondo. Rimane solo, diventa uno dei tanti ragazzini randagi che nel sud della Russia campano di elemosine, furti e prostituzione. È il suo apprendistato al coraggio il coraggio di non essere mai stanco di vivere, nonostante tutto. Nei bassifondi, Nil impara a non voltarsi indietro, a sgattaiolare tra gli orrori e a gioire profondamente delle poche cose importanti: la libertà, l amicizia, l amore, nella sua banda di mendicanti armati di coltelli finlandesi",
     "id": "14",
     "isFavourite":false,
     "category": "storico",
     "isRead":false
    },
    {
     "author": "Philip. K.Dick",
     "title": "La svastica sul sole",
     "cover": "https://www.scuolafilosofica.com/wp-content/uploads/2017/09/la-svastica-sul-sole.jpg",
     "description": "La svastica sul sole (The Man in the High Castle), ripubblicato anche come L'uomo nell'alto castello, è un romanzo ucronico di Philip K. Dick pubblicato nel 1962 e vincitore del Premio Hugo come miglior romanzo nel 1963.In esso viene rappresentato un universo alternativo dominato principalmente dalla Germania nazista e dall'Impero giapponese a seguito di un'ipotetica vittoria dell'Asse nella seconda guerra mondiale, che rovescia quindi l'esito reale degli avvenimenti storici.",
     "id": "16",
     "isFavourite":false,
     "category": "fantascienza",
     "isRead":false
    },
    {
     "author": "Adam Mosciski",
     "title": "Handmade Soft Gloves",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Ex dolores veniam id. Quas nostrum excepturi. Expedita reprehenderit quae eaque dicta. Nihil eos repellendus molestiae commodi.",
     "id": "17",
     "isFavourite":false,
     "category": "cucina",
     "isRead":false
    },
    {
     "author": "Babbo Natale",
     "title": "Pinguini",
     "cover": "https://eidec2hct28.exactdn.com/uploads/Original_WW223791-scaled.jpg?strip=all&lossy=1&ssl=1",
     "description": "la storia dei pinguini",
     "id": "18",
     "isFavourite":false,
     "category": "narrativa",
     "isRead":false
    },
    {
     "author": "Flora Stehr",
     "title": "Unbranded Plastic Tuna",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Ratione veritatis sint quasi magni recusandae libero est ratione unde. Aut deserunt ad rem id in deleniti nobis. Odit dolorem sequi modi doloremque saepe quae. Repellat tempore aspernatur soluta nihil impedit impedit ipsa veniam rem.",
     "id": "19",
     "isFavourite":false,
     "category": "biografico",
     "isRead":false
    },
    {
     "author": "Wilfred Okuneva",
     "title": "Intelligent Soft Mouse",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Eveniet eveniet facilis natus ipsum corporis. Sed mollitia nihil vitae velit. Voluptas magni voluptate explicabo ratione quasi facere voluptates minus eaque. Minima quidem rem nesciunt aut sunt molestias. A perferendis animi vero rerum perferendis corporis debitis soluta voluptate.",
     "id": "20",
     "isFavourite":false,
     "category": "storico",
     "isRead":false
    },
    {
     "author": "Vera Cummings",
     "title": "Elegant Soft Pizza",
     "cover": "https://loremflickr.com/640/480/abstract",
     "description": "Asperiores inventore consequuntur. Repellendus hic neque aperiam voluptatum quos. Voluptatum laborum itaque facere veniam delectus necessitatibus adipisci sit.",
     "id": "21",
     "isFavourite":false,
     "category": "romantico",
     "isRead":false
    }
   ]



  constructor(private http: HttpClient,private storage:BookStorageService) 
              {this.allBooksSubject.next(this.jsonBooks)}


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
