import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  searchTerm = '';
  showBack:boolean = false

  constructor(
    private route: ActivatedRoute,
    public bookServ: BookServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookServ.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.bookServ.searchBooks(this.searchTerm);
      this.bookServ.allBooks$.subscribe((books) => {
        this.books = books;
        this.showBack = true
      });
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  deleteBook(bookId: string): void {
    this.bookServ.deleteBook(bookId).subscribe(
      () => {
        this.bookServ.getBooks().subscribe((books) => {
          this.books = books;
        });
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.error("Errore durante l'eliminazione del libro:", error);
      }
    );
  }

  sortByTitle(property: string): void {
    this.books.sort((a, b) => a.title.localeCompare(b.title));
  }
  sortByAuthor(property: string): void {
    this.books.sort((a, b) => a.author.localeCompare(b.author));
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.onSearch();
    }
  }

  navigateToBookDetails(id: string): void {
    this.router.navigateByUrl(`/book-card/${id}`);
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/home').then(() => {
      this.bookServ.getBooks().subscribe((books) => {
        this.books = books;
        this.showBack = false;
      });
    });
  }
  
  
}
