import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { Book } from 'src/app/model/book';
import { BookStorageService } from 'src/app/services/book-storage.service';
import { CardBookComponent } from '../card-book/card-book.component';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, MaterialModule,CardBookComponent],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
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
