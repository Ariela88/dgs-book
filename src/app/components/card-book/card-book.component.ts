import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookServiceService } from 'src/app/services/book.service';
import { BookStorageService } from 'src/app/services/book-storage.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-card-book',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss'],
})
export class CardBookComponent implements OnInit{

  @Input() isFavourite: boolean = false;
  @Input() book?: Book;
  @Input() isEditing:boolean = false

  constructor(
    private bookServ: BookServiceService,
    private route: ActivatedRoute,
    public storage:BookStorageService,
    public router:Router) {}

 
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

  startEditing(id:string): void {
    this.isEditing = true;
    this.router.navigateByUrl('editor/' + id)
  }
}
