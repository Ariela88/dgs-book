import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookServiceService } from 'src/app/services/book-service.service';
import { BookStorageService } from 'src/app/services/book-storage.service';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss'],
})
export class BookEditorComponent implements OnInit {
  editedBook: Book = {
    id: '',
    author: '',
    title: '',
    cover: '',
    description: '',
  };
  bookForm!: FormGroup;
  isEditing = false;

  allBooks:Book[]=[]

  constructor(
    private bookServ: BookServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private bookStorageService: BookStorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.bookForm = this.formBuilder.group({
      title: [''],
      author: [''],
      id: [''],
      cover: [''],
      description: [''],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookServ.getBook(id).subscribe(
        (book) => {
          if (book) {
            this.bookForm.patchValue(book);
          } else {
            console.error(`Nessun libro trovato con ID: ${id}`);
          }
        },
        (error) => {
          console.error('Errore nel recupero del libro:', error);
        }
      );
    }
  }

  private initForm(): void {
    this.bookForm = this.formBuilder.group({
      id: [''],
      author: ['', Validators.required],
      title: ['', Validators.required],
      cover: [''],
      description: [''],
    });
  }

  startEditing(): void {
    this.isEditing = true;
  }

  saveBook(): void {
    if (this.bookForm.valid) {
      const updatedBook: Book = this.bookForm.value;
      if (!this.isEditing) {
        this.bookServ.createBook(updatedBook).subscribe(
          (response) => {
            this.bookStorageService.addBookToLocalStorage(response);
            this.router.navigateByUrl('/home');
          },
          (error) => {
            console.error('Errore durante la creazione del libro:', error);
          }
        );
      } else {
        this.bookServ.updateBook(updatedBook.id, updatedBook).subscribe(
          (response) => {
            console.log('Libro aggiornato con successo:', response);
            this.router.navigateByUrl('/home');
          },
          (error) => {
            console.error("Errore durante l'aggiornamento del libro:", error);
          }
        );
      }
    } else {
      console.error('Il form non è valido. Controlla i dati del libro.');
    }
  }

  cancelEditing(): void {
    this.resetFormAndExitEditMode();
  }

  private resetFormAndExitEditMode(): void {
    this.bookForm.reset({
      id: '',
      author: '',
      title: '',
    });
    this.isEditing = false;
  }

  // goToNextBook(): void {
  //   const currentId = this.route.snapshot.paramMap.get('id');
  //   const currentIndex = this.allBooks.findIndex(book => book.id === currentId);
  
   
  //   if (currentIndex !== -1 && currentIndex < this.allBooks.length - 1) {
     
  //     const nextBookId = this.allBooks[currentIndex + 1].id;

  //     this.router.navigate(['/libri', nextBookId]);
  //   } else {
  //     console.error('Nessun prossimo libro disponibile.');
     
  //   }
  // }
  
  
}
