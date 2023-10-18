import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { Book } from 'src/app/model/book';
import { BookServiceService } from 'src/app/services/book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule,MaterialModule,FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  searchTerm = '';
  showBack:boolean = false
  selectedSortingOption: string = 'author';

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


  sortBooksBy(param: 'title' | 'author'): void {
    this.books.sort((a, b) => {
      if (param === 'title') {
        return a.title.localeCompare(b.title);
      } else if (param === 'author') {
        return a.author.localeCompare(b.author);
      }
      return 0; 
    });
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
