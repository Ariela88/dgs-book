import { Component, Input, OnInit } from '@angular/core';
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
  bookForm!: FormGroup;
  isEditing = false;



  constructor(
    private bookServ: BookServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public bookStorageService: BookStorageService
  ) {}

  ngOnInit(): void {
    this.initForm();

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
      isFavourite: false,
    });
  }

  

  startEditing(): void {
    this.isEditing = true;
  }

  saveBook(): void {
    if (this.bookForm.valid) {
      let updatedBook: Book = this.bookForm.value;
      if (!this.isEditing) {
        this.bookServ.createBook(updatedBook)
        //.subscribe(
          // (response) => {
          //   this.bookStorageService.addBookToLocalStorage(response);
            
            this.router.navigateByUrl('/home');
          
          }
        
      
      
      else {
        this.bookServ.updateBook(updatedBook.id, updatedBook).subscribe(
          (response) => {
            this.resetFormAndExitEditMode();
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

  private resetFormAndExitEditMode(): void {
    this.bookForm.reset({
      id: '',
      author: '',
      title: '',
    });
    this.isEditing = false;
  }
}
