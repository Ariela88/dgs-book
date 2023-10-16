import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { BookServiceService } from 'src/app/services/book-service.service';
import { BookStorageService } from 'src/app/services/book-storage.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent {
  newBook: Book = {
    id: '',
    author: '',
    title: '',
  };
  bookForm!: FormGroup;
isEditing = false
  constructor(
    private formBuilder: FormBuilder,
    private bookServ: BookServiceService,
    private bookStorageService: BookStorageService
  ) {}

  ngOnInit(): void {
    console.log('book')
    this.initForm();
  }

 initForm(): void {
    this.bookForm = this.formBuilder.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
    });
  }
  cancelEditing(): void {
    this.resetFormAndExitEditMode();
  }
  resetFormAndExitEditMode(): void {
    this.bookForm.reset({
      id: '',
      author: '',
      title: ''
    });
    this.isEditing = true;
  }
  saveNewBook(): void {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookServ.createBook(newBook).subscribe(
        (response) => {
          console.log('Nuovo libro creato con successo:', response);
          this.bookStorageService.addBookToLocalStorage(response);
          this.bookForm.reset();
        },
        (error) => {
          console.error('Errore durante la creazione del libro:', error);
        }
      );
    } else {
      console.error('Il form non è valido. Controlla i dati del libro.');
    }
  }
}
