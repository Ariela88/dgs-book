import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookServiceService } from 'src/app/services/book-service.service';
import { BookStorageService } from 'src/app/services/book-storage.service';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss'],
})
export class CardBookComponent implements OnInit{

  @Input() isFavourite: boolean = false;
  @Input() book?: Book;

  constructor(
    private bookServ: BookServiceService,
    private route: ActivatedRoute,
    public storage:BookStorageService,
    
  
  ) {}

 
    ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        const id = params['id'];
        if (id) {
          this.bookServ.getBook(id).subscribe((book) => {
            this.book = book;
          });
        }
      });
  }
}
