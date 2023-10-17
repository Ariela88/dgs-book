import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookServiceService } from 'src/app/services/book-service.service';
import { BookStorageService } from 'src/app/services/book-storage.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss'],
})
export class BookAddComponent {
  newBook: Book = {
    id: '',
    author: '',
    title: '',
    cover: '',
    description: '',
    isFavourite:false
  };
  bookForm!: FormGroup;
  isEditing = false;
  constructor(
    private formBuilder: FormBuilder,
    private bookServ: BookServiceService,
    private bookStorageService: BookStorageService,
    private route: Router
  ) {}

  ngOnInit(): void {
  
    this.initForm();
  }

  initForm(): void {
    this.bookForm = this.formBuilder.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      cover: [''],
      description: [''],
    });
  }

  saveNewBook(): void {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookServ.createBook(newBook).subscribe(
        (response) => {
          this.bookStorageService.addBookToLocalStorage(response);
          this.bookForm.reset();
          this.route.navigateByUrl('/home');
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
