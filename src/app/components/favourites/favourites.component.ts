
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material/material.module';
import { Book } from 'src/app/model/book';
import { BookStorageService } from 'src/app/services/book-storage.service';
import { CardBookComponent } from '../card-book/card-book.component';
import { NgFor } from '@angular/common';


@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss'],
    standalone: true,
    imports: [NgFor, CardBookComponent,MaterialModule]
})
export class FavouritesComponent implements OnInit {

  favourites: Book[] = [];

  constructor(private bookStorageService: BookStorageService) {}

  ngOnInit(): void {
    this.bookStorageService.favouritesSubject.subscribe((ArrayOfFavourites) => {
    this.favourites = ArrayOfFavourites
   
    });
  }
  

  removeFromFavourites(book: Book): void {
    this.bookStorageService.removeBookToFavourites(book);
  }
}
