
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookServiceService } from 'src/app/services/book.service';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  searchTerm = '';
  showBack:boolean = false
  selectedSortingOption: string = 'author';
  ascending: boolean = true;


  constructor(
    private route: ActivatedRoute,
    public bookServ: BookServiceService,
    private router: Router,
    public themeChange:ThemeService
  ) {}

 

  toggleColore(): void {
    this.themeChange.toggleColore();
  }

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


  
  sortBooksBy(param: 'title' | 'author' | 'id'): void {
    this.books.sort((a, b) => {
        if (param === 'title') {
            return this.ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        } else if (param === 'author') {
            return this.ascending ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author);
        } else if (param === 'id') {
            const idA = parseInt(a.id, 10); 
            const idB = parseInt(b.id, 10); 

            return this.ascending ? idA - idB : idB - idA;
        }
        return 0; 
    });

    this.ascending = !this.ascending;
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
