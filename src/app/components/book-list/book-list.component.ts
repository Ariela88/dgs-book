import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  searchTerm = '';
  showMainTable: boolean = true;
  showSearchTable: boolean = false;

  constructor(private route: ActivatedRoute, public bookServ: BookServiceService, private router: Router) {}

  ngOnInit(): void {
    this.bookServ.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  onSearch(): void {
   
      if (this.showMainTable) {
    console.log('Ricerca in corso con il termine:', this.searchTerm);
    this.bookServ.searchBooks(this.searchTerm);
    this.showMainTable = false; 
    this.showSearchTable = true; }
    else{console.log('Tornando alla tabella principale.');
    this.router.navigateByUrl('/home');
    this.showMainTable = true;
    this.showSearchTable = false;
    }
  }

  showMain(): void {
    this.showMainTable = true;
    this.showSearchTable = false;
  }

  deleteBook(bookId: string): void {
    this.bookServ.deleteBook(bookId).subscribe(
      () => {
        this.bookServ.getBooks().subscribe(books => {
          this.books = books;
        });
        this.router.navigateByUrl('/home');
      },
      error => {
        console.error('Errore durante l\'eliminazione del libro:', error);
      }
    );
  }
  
}
