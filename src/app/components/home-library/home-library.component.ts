
import { Component } from '@angular/core';
import { BookListComponent } from '../book-list/book-list.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-library',
    templateUrl: './home-library.component.html',
    styleUrls: ['./home-library.component.scss'],
    standalone: true,
    imports: [BookListComponent,CommonModule]
})
export class HomeLibraryComponent{}
