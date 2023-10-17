import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { BookStorageService } from 'src/app/services/book-storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favourites: Book[] = [];

  constructor(private bookStorageService: BookStorageService) {
   
  }

  ngOnInit(): void {
    this.bookStorageService.favouritesSubject.subscribe((favourites) => {
    this.favourites = favourites
    });
  }
  

  removeFromFavourites(book: Book): void {
    this.bookStorageService.removeBook(book);
  }
}
