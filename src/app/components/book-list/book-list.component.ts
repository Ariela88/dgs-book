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
  displayedColumns: string[] = ['id', 'title', 'author', ' '];

  books: Book[] = [];

  constructor(private route: ActivatedRoute, private bookServ: BookServiceService, private router: Router) {}

  ngOnInit(): void {
    this.bookServ.getBooks().subscribe(books => {
      this.books = books;
    });
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
