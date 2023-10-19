import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookServiceService } from 'src/app/services/book.service';
import { BookStorageService } from 'src/app/services/book-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';


@Component({
    selector: 'app-book-editor',
    templateUrl: './book-editor.component.html',
    styleUrls: ['./book-editor.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        MatButtonModule,
        RouterLink,
    ],
})
export class BookEditorComponent implements OnInit {
  bookForm!: FormGroup;
  isEditing = false;
  bookId!: string 
  constructor(
    private bookServ: BookServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public bookStorageService: BookStorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    this.bookId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.bookId) {
      this.isEditing = true;
     
      this.bookServ.getBook(this.bookId).subscribe(
        (book) => {
          if (book) {
            this.bookForm.patchValue(book);
          } else {
            console.error(`Nessun libro trovato con ID: ${this.bookId}`);
          }
        },
        (error) => {
          console.error('Errore nel recupero del libro:', error);
        }
      );
    }
  }

initForm(): void {
    this.bookForm = this.formBuilder.group({
      id: [''],
      author: ['', Validators.required],
      title: ['', Validators.required],
      cover: [''],
      description: [''],
      isFavourite: [false],
    });
  }

  saveBookEdited(): void {
    if (this.bookForm.valid) {
      const book: Book = this.bookForm.value;
      if (this.isEditing) {
      
        this.bookServ.updateBook(this.bookId, book).subscribe(
          (response) => {
            this.router.navigateByUrl('/home');
          },
          (error) => {
            console.error("Errore durante l'aggiornamento del libro:", error);
          }
        );
      } else {
       
        this.bookServ.createBook(book).subscribe(
          (response) => {
            this.router.navigateByUrl('/home');
          },
          (error) => {
            console.error('Errore durante la creazione del libro:', error);
          }
        );
      }
    } else {
      console.error('Il form non è valido. Controlla i dati del libro.');
    }
  }
}
